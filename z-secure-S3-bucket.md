---
layout: default
title: Securing your AWS S3 bucket
permalink: /secure-S3-bucket/
description: How to secure your AWS S3 bucket to store your mLab backups
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[aws-console]:            https://console.aws.amazon.com/console/home
[aws-console-iam]:        https://console.aws.amazon.com/iam/home
[aws-console-s3]:         https://console.aws.amazon.com/s3/home
[aws-policyversion]:      http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Version
[aws-S3-versioning]:      http://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html
[aws-creatingabucket]:    https://docs.aws.amazon.com/AmazonS3/latest/UG/CreatingaBucket.html
[aws-preventunencrypted]: https://aws.amazon.com/blogs/security/how-to-prevent-uploads-of-unencrypted-objects-to-amazon-s3/
[aws-SSE-S3]: http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html

# {{ page.title }}
{:.no_toc}

If you want to store one-time or recurring backups to your own Amazon S3 bucket at Amazon Web Services (AWS), you must secure your container using AWS Identity and Access Management (IAM).

## Instructions

Follow the instructions below which describe how to use IAM to create a custom policy for an IAM user that mLab can use to access your AWS S3 bucket:

1. Log in to AWS' management console
1. If you do not yet have an S3 bucket to hold mLab backups, create one by clicking "S3" to [open the S3 Console][aws-console-s3]. Refer to AWS' documentation on [creating an S3 bucket and bucket naming conventions][aws-creatingabucket].
1. Click "IAM" to [open the IAM Console][aws-console-iam]
1. Click "Policies" to create your own policy
   - The "Policy Name" could, for example, be `mLabS3BackupsPolicy`
   - If your bucket does not have [versioning-enabled][aws-S3-versioning] (this is AWS' default), copy and paste the first policy below but replace `youraccountname-mlab-backups` with the name of your AWS S3 bucket for backups. If your bucket does have versioning-enabled, instead copy the second policy below which also allows the `s3:GetObjectVersion` and `s3:DeleteObjectVersion` actions.
   - Do **not** change the "Version" date (for more information, see [AWS' IAM documentation on this 'Version' element][aws-policyversion])
1. Click "Groups" to create a new group, attaching the policy created in the previous step to this new group
- The "Group Name" could, for example, be `mLabGroup`
1. Click "Users" to create a new user, adding this user to the group created in the previous step
- The "User Name" could, for example, be `mLabUser`
- Check the "Programmatic access" checkbox
- Make note of the user's credentials (Access Key ID and Secret Access Key) since they will be required when scheduling backups in mLab's management portal

**Policy to copy and paste, replacing only `youraccountname-mlab-backups`:**

{% highlight text %}
{
  "Version": "2012-10-17",
  "Statement": [
        {
          "Effect": "Allow",
          "Action": [ "s3:ListBucket" ],
          "Resource": "arn:aws:s3:::youraccountname-mlab-backups"
        },
        {
          "Effect": "Allow",
          "Action": [
              "s3:GetObject",
              "s3:GetObjectAcl",
              "s3:PutObject",
              "s3:PutObjectAcl",
              "s3:DeleteObject"
          ],
          "Resource": [ "arn:aws:s3:::youraccountname-mlab-backups/*" ]
        }
    ]
}
{% endhighlight %}

**Policy to copy and paste if your S3 bucket has versioning-enabled, replacing only `youraccountname-mlab-backups`:**

{% highlight text %}
{
  "Version": "2012-10-17",
  "Statement": [
        {
          "Effect": "Allow",
          "Action": [ "s3:ListBucket" ],
          "Resource": "arn:aws:s3:::youraccountname-mlab-backups"
        },
        {
          "Effect": "Allow",
          "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:GetObjectAcl",
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:DeleteObject",
                "s3:DeleteObjectVersion"
          ],
          "Resource": [ "arn:aws:s3:::youraccountname-mlab-backups/*" ]
        }
    ]
}
{% endhighlight %}

## Requiring Encryption (optional) {#require-encryption}

When scheduling a mongodump-based backup, you can choose to store the resulting mongodump encrypted at rest in your S3 bucket. mLab will respect your decision to encrypt a backup (or not) irrespective of the policies on the bucket.

However, you might also wish to mandate that all objects that are to be uploaded to your bucket – by mLab or otherwise – are encrypted at rest. Adding the additional policy below to your bucket will allow you to ensure that backups are stored encrypted at rest and prevents you or a team member from unintentionally requesting a backup that is not stored encrypted at rest.

{:.warning-box}
<div markdown="1">
By setting the below policy on your bucket, you prevent anyone from uploading any object to the bucket without setting the appropriate encryption header. This could potentially break other tools which upload objects to the same bucket. It also requires that you always enable encryption when taking mLab mongodumps to this bucket. This means you may need to delete and re-create any existing mLab backup plans that do not have encryption enabled. Setting this policy will have no effect on existing objects in the bucket.
</div>
{:.warning-box}

{:.note-box}
<div markdown="1">
Note that this does not instruct the S3 bucket to encrypt incoming objects but rather to reject any incoming upload requests that don't have the appropriate encryption header set. As such, you will also need to explicitly request that future backups are encrypted.
</div>
{:.note-box}

To require server-side encryption for all objects uploaded to your S3 bucket:

1. Copy and paste the policy statements below but replace `youraccountname-mlab-backups` with the name of your AWS S3 bucket for backups
1. Update the "Statement" array in your existing policy (the one created above) to include these additional statements
1. Perform the following tests to make sure the policy is working as expected:
- Take a mongodump via mLab's backup system with encryption enabled. This should succeed.
- Take a mongodump via mLab's backup system with encryption disabled. This should fail.

**Policy statements to copy and paste, replacing only `youraccountname-mlab-backups`:**

{% highlight text %}
        {
            "Effect": "Deny",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::youraccountname-mlab-backups/*",
            "Condition": {
                "Null": {
                    "s3:x-amz-server-side-encryption": true
                }
            }
        },
        {
            "Effect": "Deny",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::youraccountname-mlab-backups/*",
            "Condition": {
                "StringNotEquals": {
                    "s3:x-amz-server-side-encryption": "AES256"
                }
            }
        }
{% endhighlight %}

For more details we recommend AWS' blog on [how to prevent uploads of unencrypted objects to Amazon S3][aws-preventunencrypted].
