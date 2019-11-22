pragma solidity ^0.5.0;

contract Certificate {
  address owner;
  mapping(string => string) certificates;
  event OwnershipTransferred(address _receiver);
  event CertificateGiven(string certificatename, string receiver);

  constructor() public {
    owner = msg.sender;
  }

  function setCertificate(string memory name, string memory receiver) public {
    require(owner == msg.sender, 'Unauthorized user!');
    certificates[name] = receiver;
    emit CertificateGiven(name, receiver);
  }

  function getCertificate(string memory name) public view returns (string memory receiver) {
    return certificates[name];
  }

  function transferOwnership(address _receiver) public {
    require(_receiver != address(0x0), 'Receiver cannot be 0x0!');

    owner = _receiver;
    emit OwnershipTransferred(_receiver);
  }
}