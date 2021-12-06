$(document).ready(function() {
    /**
     * Add evento de click
     */
    function recomendSong () {
        var request = new XMLHttpRequest()

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'http://0.0.0.0/songRecomendation/', true)

        request.onload = function (response) {
            var item = JSON.parse(response.target.response)

            $recomendedSong = $('#recomendedSong');
            $('#song').remove();
            $div = $('<div id="song">');
            $recomendedSong.append($div);


            $label = $('<label>').appendTo($div);

            $('<big>')
                .appendTo($label)
                .append(item.title);

            $label.append(" - "
            );

            $('<small>')
                .appendTo($label)
                .append(item.singer);

            $('.js-novo-livro, .js-novo-autor').val('');
            // Begin accessing JSON data here
        }
        // Send request
        request.send()
    }


    function recomendPlaylist () {
        var request = new XMLHttpRequest()

        // Open a new connection, using the GET request on the URL endpoint
        request.open('POST', 'http://0.0.0.0/songRecomendation/', true)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.onload = function (response) {
                var data = JSON.parse(response.target.response)
                $('#playlist-content').remove();
                $ul = $('<ul id="playlist-content">').appendTo('#playlist');
                data.forEach(item => {
                    $li = $('<li>').appendTo($ul);
                    $label = $('<label>').appendTo($li);

                    $('<big>')
                        .appendTo($label)
                        .append(item.title);

                    $label.append(" - "
                    );

                    $('<small>')
                        .appendTo($label)
                        .append(item.singer);

                    $('.js-novo-livro, .js-novo-autor').val('');
                    // Begin accessing JSON data here
                })
        }

        // Send request
        playlistSize = $('.js-playlist-size').val();
        var data = JSON.stringify({'length': parseInt(playlistSize)});
        // Send request
        request.send(data)
    }
    getSongs();
    function getSongs() {
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest()

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'http://0.0.0.0/song/', true)

        request.onload = function (response) {
            console.log(response)
            var data = JSON.parse(response.target.response)
            console.log(data)

            data.forEach( item => {
                $ul = $('ul');
                $li = $('<li>').appendTo($ul);
                $div = $('<div>')
                      .addClass('checkbox')
                      .appendTo($li);

                $label = $('<label>').appendTo($div);
                $('<input>')
                      .attr('type', 'checkbox')
                      .addClass('js-livro')
                      .attr('name', 'list')
                      .click(toggleRemovido)
                      .appendTo($label);

                $('<big>')
                      .appendTo($label)
                      .append(item.title);

                $label.append(" - "

                );

                $('<small>')
                      .appendTo($label)
                      .append(item.singer);

                $('.js-novo-livro, .js-novo-autor').val('');
                  // Begin accessing JSON data here
                    })

        }

        // Send request
        request.send()
    }

    function onAdd() {

        var $ul, li, $li, $label, $div, livro, autor;
        livro = $('.js-novo-livro').val();
        autor = $('.js-novo-autor').val();

        // valida se “livro” está vazio
        if (livro === '') {
              return;
        }

        $ul = $('ul');
        $li = $('<li>').appendTo($ul);
        $div = $('<div>')
              .addClass('checkbox')
              .appendTo($li);

        $label = $('<label>').appendTo($div);
        $('<input>')
              .attr('type', 'checkbox')
              .addClass('js-livro')
              .attr('name', 'list')
              .click(toggleRemovido)
              .appendTo($label);

        $('<big>')
              .appendTo($label)
              .append(livro);

        $label.append(" - "

        );

        $('<small>')
              .appendTo($label)
              .append(autor);

        $('.js-novo-livro, .js-novo-autor').val('');

        var request = new XMLHttpRequest()

        // Open a new connection, using the GET request on the URL endpoint
        request.open('POST', 'http://0.0.0.0/song/', true)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var new_song = {'title': livro,
            'singer': autor,
        'genre': 'test'};
        var data = JSON.stringify(new_song);
        // Send request
        request.send(data)

    }

    /**
     * Evento de click do checkbox
     */
    function toggleRemovido(ev) {
          var $el;
          $el = $(ev.currentTarget);
          $el.closest('li').toggleClass('removido');
    }
    $('.js-add').click(onAdd);
    $('.js-livro').click(toggleRemovido);
    $('.js-recomend').click(recomendSong);
    $('.js-recomend-playlist').click(recomendPlaylist);
});
