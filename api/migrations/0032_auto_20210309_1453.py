# Generated by Django 2.2.13 on 2021-03-09 20:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_auto_20210309_1451'),
    ]

    operations = [
        migrations.RenameField(
            model_name='estudiante',
            old_name='dir_Cont',
            new_name='dir_cont',
        ),
    ]