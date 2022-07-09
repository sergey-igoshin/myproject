//Функция проверки пользователя в базе
function getUser(){
    $('.p-submit').addClass('p-btn_sending');
    $('.p-form__errorbox-wrapper').css('display', 'none' );
    $('.p-start__form-bottom-text').css('display', 'none' );
    var password = $('[name="password"]').val();
    var login = $('[name="login"]').val();
    getLoad(login, password);
}

function getLoad(login, password, action){
    // var url = "https://cdntilda.ru/login";
    var url = "/login";
    const data = new URLSearchParams({
        'action': action, 
        'user_mail': login,
        'user_password': password
    });
    
    var getData = async url => {
        try {
            var response = await fetch(url, {
                method: 'POST', 
                body: data,
            });
            var json = await response.json();
            startPage(json.data);
        } catch (error) {
            console.log('error:', error);
        }
    };
    getData(url, data);
};

//Функция "Логин пароль не верный"
function notLoginPassword(data){
    $('.p-submit').removeClass('p-btn_sending')
    $('.p-form__errorbox-wrapper').css('display', 'block' );
    // $('.p-start__form-bottom-text').css('display', 'block' );
    $('.p-form__errorbox').html(data);
    // console.log(data)
};

function main(data){
    console.log(data)
    if(!data.login){
        return notLoginPassword(data.answer);
    };
    
}

//Функция показать пароль
function readyPage(){
    $('body').on('click', '.p-password-control', function(){
        if ($('#password-input').attr('type') == 'password'){
            $(this).addClass('view');
            $('#password-input').attr('type', 'text');
        } else {
            $(this).removeClass('view');
            $('#password-input').attr('type', 'password');
        }
        return false;
    });
}


//Функция стартовой страницы
function startPage(data){
    $('#content_body').html(function(){
        var body = data.body
        return body;
    });
}

// $(document).ready(function(){
//     getLoad()
// });