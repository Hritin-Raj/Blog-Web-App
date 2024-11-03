$(document).ready(function () {
    // Initialize the Slick slider
    $('.post-slider ul').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false, // Hide default arrows
    });

    // Event listener for custom left and right buttons
    $('#left-slider').click(function () {
        $('.post-slider ul').slick('slickPrev');
    });

    $('#right-slider').click(function () {
        $('.post-slider ul').slick('slickNext');
    });

    // Fetch and display whenever page loads
    fetchPostDetails()
});


async function fetchPostDetails() {
    const response = await fetch('/api/posts')

    if(!response.ok) {
        console.log("Post Not Found")
        throw new Error("Post Not Found")
    }
    
    const posts = await response.json()

    console.log(posts)

    for(let i=1; i<=5 ;i++) {
        let id = "#post-" + i.toString()
        //console.log(posts[i-1].createdAt.split('T')[0])
        document.querySelector(id + " .post-title span").innerHTML = posts[i-1].title  
        document.querySelector(id + " .username span").innerHTML = posts[i-1].authorId.username.split(' ')[0]
        console.log(document.querySelector(id + " .username span")) 
        document.querySelector(id + " .date span").innerHTML = posts[i-1].createdAt.substring(0, 10)
    }
}
