// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AyurTrace {
    struct Event {
        string eventType;
        string batchId;
        string dataHash;
        uint256 timestamp;
        address actor;
    }
    Event[] public events;

    event SupplyChainEvent(string eventType, string batchId, string dataHash, uint256 timestamp, address actor);

    function logEvent(string memory eventType, string memory batchId, string memory dataHash) public {
        events.push(Event(eventType, batchId, dataHash, block.timestamp, msg.sender));
        emit SupplyChainEvent(eventType, batchId, dataHash, block.timestamp, msg.sender);
    }

    function getEvent(uint index) public view returns (string memory, string memory, string memory, uint256, address) {
        Event memory e = events[index];
        return (e.eventType, e.batchId, e.dataHash, e.timestamp, e.actor);
    }

    function getEventsCount() public view returns (uint) {
        return events.length;
    }
}
