# Generated by Django 2.2.13 on 2021-02-15 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_grado'),
    ]

    operations = [
        migrations.CreateModel(
            name='CicloEscolar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('anio', models.IntegerField(blank=True, null=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('activo', models.BooleanField(default=True)),
            ],
        ),
    ]
