# Generated by Django 2.2.6 on 2019-11-07 07:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("models", "5473_exportable_nodegroup_node_fieldname"),
    ]

    operations = [
        migrations.RemoveField(model_name="nodegroup", name="exportable",),
        migrations.AddField(model_name="node", name="exportable", field=models.BooleanField(default=False, null=True),),
    ]
