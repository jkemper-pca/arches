# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2017-04-25 11:36


import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("models", "0003_40b4"),
    ]

    operations = [
        migrations.AlterField(model_name="resourcexresource", name="relationshiptype", field=models.TextField(blank=True, null=True),),
        migrations.AddField(
            model_name="resourcexresource",
            name="modified",
            field=models.DateTimeField(default=datetime.datetime.now()),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="resourcexresource",
            name="created",
            field=models.DateTimeField(default=datetime.datetime.now()),
            preserve_default=False,
        ),
        migrations.AlterField(model_name="function", name="component", field=models.TextField(blank=True, null=True, unique=True),),
        migrations.AlterField(model_name="geocoder", name="component", field=models.TextField(unique=True),),
        migrations.AlterField(model_name="geocoder", name="name", field=models.TextField(unique=True),),
        migrations.AlterField(model_name="widget", name="component", field=models.TextField(unique=True),),
        migrations.AlterField(model_name="widget", name="name", field=models.TextField(unique=True),),
    ]
