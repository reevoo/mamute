function commentLengthCounter(a){var b;b=this!==window?$(this).val().length:$(a).val().length,$(".comment-length-counter").html(" "+(600-b))}$(document).on("keyup",".comment-textarea",commentLengthCounter);