import sys
sys.path.insert(0, '../server/')
from app import Song

def test_new_song():
        """
        GIVEN a Song model
        WHEN a new Song is created
        THEN check the title, key, instrumentation, and notes fields are defined correctly
        """
        song=Song(
                title="Moondance",
                key='G',
                instrumentation="piano",
                notes="la la"
        )
        assert song.title == "Moondance"
        assert song.key == "G"
        assert song.instrumentation == "piano"
        assert song.notes == "la la"

