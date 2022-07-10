// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Election {
    string public candidateName;

    constructor () {
        candidateName = "Candidate 1";
    }

    function candidater () public view returns (string memory) {
        return candidateName;
    }

    function setCandidate (string memory _name) public {
        candidateName = _name;
    }
}
