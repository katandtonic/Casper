$(document).ready(
    subscribe()
);

// Initialize popovers everywhere
$(function () {
  $('[data-toggle="popover"]').popover()
})


function subscribe() {
    $("#cta-post-subscriber-email-btn").click(subscribe_cta_btn);

    $("#footer-subscribe-btn").click(subscribe_footer_btn);
};

function subscribe_cta_btn(e) {
    e.preventDefault();
    var btn_id = "#cta-post-subscriber-email-btn";
    var input_id = "#cta-post-subscriber-email-input";
    user_subscribe(btn_id, input_id)
}

function subscribe_footer_btn(e) {
    e.preventDefault();
    var btn_id = "#footer-subscribe-btn";
    var input_id = "#footer-subscribe-form-control";
    user_subscribe(btn_id, input_id)
}

function user_subscribe(btn_id, input_id) {
    console.log("katkatkat 720");
    var email = $(input_id).val();
    var valid_email = $(input_id)[0].checkValidity();
    if (valid_email) {
        status = "pending";
        emailData = JSON.stringify({email: email});
        $.ajax({
            url: 'https://moxieleague.com/app/moxieleague/api/v1.0/subscribers',
            data: emailData,
            dataType: "json",
            contentType: "application/json",
            type: 'POST',
            success: function(response) {
                $('#subscriberSuccessModal').modal();
            },
            error: function(error) {
                // Manually trigger a popover
                // TODO surface error msg
                $(input_id).popover('show');
            }
        });
    } else {
        // https://stackoverflow.com/questions/17683874/how-to-change-the-color-of-a-bootstrap-popover-in-javascript/32205454?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        var popover_template = '<div class="popover largerpopover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body trythis"></div></div>'
        var popover_unsuccessful_options = {content: "Please provide a valid email", placement:"top", template: popover_template, container: 'body'};
        $(input_id).popover(popover_unsuccessful_options);
        $(input_id).popover("show");
    };
};

