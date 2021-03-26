# Generated by Django 2.2.13 on 2021-03-16 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_auto_20210311_1302'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tarea',
            old_name='fecha_entrea',
            new_name='fecha_entrega',
        ),
        migrations.AlterField(
            model_name='tarea',
            name='nota',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]