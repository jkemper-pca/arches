# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-06 14:02


from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("models", "2891_adds_tile_provisional_json"),
    ]

    operations = [
        migrations.AddField(model_name="editlog", name="resourcedisplayname", field=models.TextField(blank=True, null=True),),
        migrations.AddField(model_name="editlog", name="user_username", field=models.TextField(blank=True, null=True),),
        migrations.RunSQL(
            """
                UPDATE edit_log SET resourcedisplayname = note WHERE note IS NOT NULL;
            """,
            """
                UPDATE edit_log SET note = resourcedisplayname WHERE resourcedisplayname IS NOT NULL;
        """,
        ),
    ]
