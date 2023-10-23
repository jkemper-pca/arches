# Generated by Django 3.2.20 on 2023-08-15 15:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("models", "10149_add_workflow_name_to_workflow_history"),
    ]

    operations = [
        migrations.RunSQL(
            sql="""
            UPDATE d_data_types
            SET defaultconfig = jsonb_set(defaultconfig, '{imagesOnly}', to_jsonb(false))
            WHERE datatype = 'file-list';
            UPDATE nodes
            SET config = jsonb_set(config, '{imagesOnly}', to_jsonb(false))
            WHERE datatype = 'file-list';
            """,
            reverse_sql="""
            UPDATE nodes
            SET config = config - 'imagesOnly'
            WHERE datatype = 'file-list';
            UPDATE d_data_types
            SET defaultconfig = defaultconfig - 'imagesOnly'
            WHERE datatype = 'file-list';
            """,
        ),
    ]
