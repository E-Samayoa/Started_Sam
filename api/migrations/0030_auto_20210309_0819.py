# Generated by Django 2.2.13 on 2021-03-09 14:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_auto_20210308_0831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catedratico',
            name='profesion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Profesion'),
        ),
    ]
