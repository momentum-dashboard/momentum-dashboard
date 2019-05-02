function fetchImage(){
    $.ajax({
        url:'https://picsum.photos/id/715/1024/768',
        method: 'GET'
    })
    .done(function(responses){
        console.log(responses);
        // responses.forEach(response => { 
        //     $('#starredRepos').append(
        //         `<div class="card-panel hoverable">
        //             <h6>name : ${response.name}</h6>
        //             <p>pushed at: ${response.pushed_at}</p>
        //             <p>created at: ${response.created_at}</p>
        //             <p><a href=https://github.com/${response.full_name}>View on Github</a></p>
        //         </div>`)
        // });
    })
    .fail(function(jqXHR, textStatus){
        console.log('request failed',textStatus);
    })
}

$(document).ready(function(){
    console.log(`readyxxxx`)
    fetchImage()
})