"""Add order_index column to song table

Revision ID: 45bf753b88d7
Revises: 
Create Date: 2021-12-07 17:19:15.348129

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45bf753b88d7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('song', sa.Column('order_index', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('song', 'order_index')
    # ### end Alembic commands ###