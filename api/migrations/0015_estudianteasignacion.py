# Generated by Django 2.2.13 on 2021-02-15 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_asignacion'),
    ]

    operations = [
        migrations.CreateModel(
            name='EstudianteAsignacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asignacion', models.ManyToManyField(to='api.Asignacion')),
                ('estudiante', models.ManyToManyField(to='api.Estudiante')),
            ],
        ),
    ]
