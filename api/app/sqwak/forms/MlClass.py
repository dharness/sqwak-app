from wtforms import Form, FileField, StringField, validators

class MlClassForm(Form):
    class_name = StringField('class_name', [
        validators.InputRequired(message="Please provide a class name")
    ])

class MlClassFile(Form):
    file = FileField('file', [
        validators.InputRequired(message="Please provide at least one file")
    ])