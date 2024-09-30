document.addEventListener('DOMContentLoaded', () => {
    let likesCount = 0;
    const likeButton = document.querySelector('.like-button');
    const likesDisplay = document.querySelector('.likes-count');
    
    likeButton.addEventListener('click', () => {
        likesCount++;
        likesDisplay.textContent = `${likesCount}명이 좋아합니다`;
    });

    const commentButton = document.querySelector('.comment-button');
    const commentInput = document.querySelector('.comment-input');
    const commentList = document.querySelector('.comment-list');

    commentButton.addEventListener('click', () => {
        const commentText = commentInput.value;
        if (commentText) {
            const commentItem = document.createElement('p');
            commentItem.textContent = commentText;
            commentList.appendChild(commentItem);
            commentInput.value = ''; // Clear the input
        }
    });
});
