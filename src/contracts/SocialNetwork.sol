pragma solidity ^0.5.0;

contract SocialNetwork {
  string public name;
  uint public postCount = 0;

  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string content;
    uint tipAmount;
    address author;
  }

  constructor() public {
    name = "Worldwide Dapp Lottery";
  }

  function createPost(string memory _content) public {
    //Increment post count
    postCount ++;
    //Create post in 2 lines
    // _post = Post(postCount, _content, 0, msg.sender);
    // posts[postCount] = _post;
    //Create post in 1 line
    posts[postCount]  = Post(postCount, _content, 0, msg.sender);

  }
}
