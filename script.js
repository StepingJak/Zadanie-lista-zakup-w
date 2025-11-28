$(document).ready(function(){
    const zapisListy = [];
    let czyszczenie = false;

    $("#btnDodajKoniec").click(function(){
        let produkt = prompt("Wpisz produkt który chcesz dodać");
        if(produkt){
            zapisListy.push(produkt);
            $("#listZakupy").append(`<li class="list-group-item">${produkt}</li>`);
        }
    });

    $("#btnDodajPoczatek").click(function(){
        let produkt = prompt("Wpisz produkt który chcesz dodać");
        if(produkt){
            zapisListy.unshift(produkt);
            $("#listZakupy").prepend(`<li class="list-group-item">${produkt}</li>`);
        }
    });

    $("#btnUsun").click(function() {
        zapisListy.pop();
        $("#listZakupy li:last").remove();
    });

    $("#btnWyczysc").click(function(){
        czyszczenie = true;
        $("#listZakupy").empty();
    });

    $("#btnPrzywroc").click(function(){
        if(czyszczenie) {
            zapisListy.forEach(function(element) {
                $("#listZakupy").append(`<li class="list-group-item">${element}</li>`);
            });
            czyszczenie = false;
        } else {
            alert("Przywracanie listy działa tylko po jej wyczyszczeniu.");
        }
    });

    $("#btnPokoloruj").click(function() {
        $("#listZakupy li:even").css("background-color", "yellow");
        $("#listZakupy li:odd").css("background-color", "lightgray");
    });

    $("#btnSortuj").click(function(){
        let items = $("#listZakupy li").get();
        items.sort(function(a, b){
            return $(a).text().localeCompare($(b).text());
        });
        $("#listZakupy").empty().append(items);
    });

    $("#btnFiltruj").click(function(){
        let fraza = $("#filterInput").val().toLowerCase();
        $("#listZakupy li").each(function(){
            let tekst = $(this).text().toLowerCase();
            if(tekst.includes(fraza)){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $("#listZakupy").sortable();
    $("#listZakupy").disableSelection();

    $(document).on("click", "li", function() {
        let element = $(this);
        let tekst = element.text();
        let input = $(`<input type="text" value="${tekst}" class="active">`);
        element.html(input);
        input.focus();

        input.keypress(function(e) {
            if (e.which === 13) {
                let nowyTekst = input.val();
                element.fadeOut(300, function() {
                    element.text(nowyTekst).fadeIn(300);
                });
            }
        });
    });
});