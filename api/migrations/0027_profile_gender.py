# Generated by Django 2.2.13 on 2021-03-02 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_profile_tipouser'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='gender',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(0, 'MALE'), (1, 'FEMALE')], null=True),
        ),
    ]