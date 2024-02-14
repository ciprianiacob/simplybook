function styleParentElement() {
    window.parent.postMessage('styleElement', 'https://dohomeart.secure.simplybook.it/v2');
}
$(document).ready(function() {
    alert("function 2");
    $(".nav-collapse").css("background", " red!important");
});
