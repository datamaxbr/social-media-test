const SocialNetwork = artifacts.require('./SocialNetwork.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

  contract('SocialNetwork', ([deployer, author, tipper]) => {
    let socialNetwork

    before(async () => {
      socialNetwork = await SocialNetwork.deployed()
    })

    describe('Deployment: ', async () => {
      it('Deploys successfully', async () => {    

        const address = await socialNetwork.address

        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('Has a name', async () => {
        const name = await socialNetwork.name()
        assert.equal(name, 'Worldwide Dapp Lottery')
      })
    })

    describe('Posting: ', async () => {
      let result, postCount

      it ('Post creation enabled', async () => {
        result = await socialNetwork.createPost('This is my first post', { from: author })
        postCount = await socialNetwork.postCount()

        //Success
        assert.equal(postCount, 1)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), postCount.toNumber(), 'The Id is correct')
        assert.equal(event.content, 'This is my first post', 'The content is correct')
        assert.equal(event.tipAmount, '0', 'The tip amount is correct')
        assert.equal(event.author, author, 'The author is correct')

        //FAILURE: Post must have content
        await socialNetwork.createPost('', { from: author }).should.be.rejected;

      })
      // it ('Post listing feature is enabled', async () => {
      //   //TODO Fill me in
      // })
      // it ('Author tipping is allowed', async () => {
      //   //TODO Fill me in
      // })
    })
  })