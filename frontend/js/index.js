$(document).ready(function() {
    /**
     * Add evento de click
     */
    getSongs();
    function getSongs() {
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest()

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'http://127.0.0.1:8000/song/', true)

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
        request.open('POST', 'http://127.0.0.1:8000/song/', true)

        request.onload = function (response) {
            console.log(response)
            var data = JSON.parse(response.target.response)
            console.log(data)

        }
var querystring = require('querystring');
        var data = querystring.stringify({'title': livro,
            'singer': autor,
        'genre': 'test'});
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
});
