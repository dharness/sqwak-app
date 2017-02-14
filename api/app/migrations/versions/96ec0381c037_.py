"""empty message

Revision ID: 96ec0381c037
Revises: 1f69cf8f4904
Create Date: 2017-02-14 20:43:13.937942

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '96ec0381c037'
down_revision = '1f69cf8f4904'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('ml_app', 'is_published',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('ml_app', 'is_published',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    # ### end Alembic commands ###