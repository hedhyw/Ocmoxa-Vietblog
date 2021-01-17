class TextPlayer {
    constructor() {
        this.replica = 0;
        this.viewer = new ReplicaViewer();
    }

    configure() {
        document.getElementById('comments-bg').addEventListener('click', () => {
            this.closeComments();
        });
        document.getElementById('button-comments-close').addEventListener('click', () => {
            this.closeComments();
        });
        document.getElementById('button-comments-open').addEventListener('click', () => {
            this.openComments();
        });

        document.getElementById('button-continue').addEventListener('click', () => {
            this.next();
        });
        document.getElementById('button-finish').addEventListener('click', () => {
            this.finish()
        });

        let audioElements = document.getElementsByTagName('audio');
        audioElements = Array.prototype.slice.call(audioElements);

        let audioLoaded = Promise.all(audioElements.map(audioElement => {
            new Promise((resolve, _) => {
                audioElement.addEventListener(
                    'canplaythrough',
                    resolve,
                    false,
                );
            })
        }))

        audioLoaded.then(() => {
            this.next();
        })
    }

    finish() {
        window.location = '/index.html';
    }

    next() {
        this.viewer.hideLoader();

        if (this.viewer.isLastReplica) {
            this.finish();

            return;
        }

        this.replica++;
        this.viewer.display(this.replica);
        this.playAudio(this.replica);

        if (this.viewer.isLastReplica) this.viewer.displayFinish();
    }

    closeComments() {
        this.viewer.closeComments();
    }

    openComments() {
        this.viewer.openComments();
    }

    playAudio(id) {
        this.viewer.stopAudio();
        this.viewer.playAudio(id);
    }
}

class ReplicaViewer {
    constructor() {
        this.isLastReplica = false;
    }

    display(id) {
        let replicaElement = document.getElementById('replica.' + id);
        replicaElement.classList.remove('hidden');
        this.isLastReplica = replicaElement.classList.contains('replica-end');

        window.scrollTo(0, document.body.scrollHeight);
    }

    displayFinish() {
        let continueElement = document.getElementById('button-continue');
        let finishElement = document.getElementById('button-finish');
        continueElement.classList.add('hidden');
        finishElement.classList.remove('hidden');
    }

    hideLoader() {
        let loaderElement = document.getElementById('loader');
        loaderElement.classList.add('hidden');
    }

    playAudio(id) {
        let audioElement = document.getElementById('audio.' + id);
        if (audioElement) {
            audioElement.play();
        }
    }

    stopAudio() {
        let audioElements = document.getElementsByTagName('audio');
        audioElements = Array.prototype.slice.call(audioElements);
        audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    closeComments() {
        document.getElementById('comments').classList.add('hidden');
        document.getElementById('comments-bg').classList.add('hidden');
        document.getElementById('button-comments-open').classList.remove('hidden');
    }

    openComments() {
        window.scrollTo(0, 0);
        document.getElementById('comments').classList.remove('hidden');
        document.getElementById('comments-bg').classList.remove('hidden');
        document.getElementById('button-comments-open').classList.add('hidden');
    }
}

player = new TextPlayer();
document.addEventListener('DOMContentLoaded', () => player.configure());

document.addEventListener('keypress', (event) => {
    if (event.code == 'Enter' || event.code == 'Space') {
        player.next();
    }
});

function play(i) {
    player.playAudio(i);
}
