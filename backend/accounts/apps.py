from django.apps import AppConfig
import mongoengine

class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        mongoengine.connect(
            db='skill_swap_db',  # You can name your DB here
            host='mongodb+srv://careercraft325:careercraft_Odoo_1207@odoo.wapb50o.mongodb.net/skill_swap_db?retryWrites=true&w=majority',
            alias='default'  # ✅ This is critical
        )


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'
