pragma solidity ^0.5.0;

contract SocialNetwork {
  string public name;
  uint public postCount = 0;

  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string content;
    uint tipAmount;
    address payable author;
  }

  event PostCreated(
    uint id,
    string content,
    uint tipAmount,
    address payable author    
    );

  event PostTipped(
    uint id,
    string content,
    uint tipAmount,
    address payable author    
    );
  constructor() public {
    name = "Worldwide Dapp Lottery";
  }

  function createPost(string memory _content) public {
    //Require valid content
    require(bytes(_content).length > 0);
    //Increment post count
    postCount ++;
    //Create post in 2 lines
    // _post = Post(postCount, _content, 0, msg.sender);
    // posts[postCount] = _post;
    //Create post in 1 line
    posts[postCount]  = Post(postCount, _content, 0, msg.sender);
    //Trigger Event
    emit PostCreated(postCount, _content, 0, msg.sender);
  }

  function tipPost(uint _id) public payable {
    // Make sure the id is valid
    require(_id > 0 && _id <= postCount);
    // fetch the post
    Post memory _post = posts[_id];
    // fetch the author
    address payable _author = _post.author;
    // Pay the author by sending the Ether
    address(_author).transfer(msg.value);
    // increment the tip amount
    _post.tipAmount = _post.tipAmount + msg.value;
    // Update the post
    posts[_id] = _post;
    // Trigger an update
    emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
  }
  
}
