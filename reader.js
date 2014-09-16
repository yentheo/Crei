addEventListener('message', function(e) {
	var lines = e.data;
	var records = [], currentNode = self.berichtstandaard;
	var firstTreeRead = false;
	for(var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var kenmerk = line.substring(0, 2);
		if(self.berichtstandaard.isValidKenmerk(kenmerk)) {
			var metadata = self.berichtstandaard.getMetadata(kenmerk);
			if(currentNode.isPossibleFollowUp(metadata)) {
				var nextNodes = currentNode.findPossibleFollowUps(metadata);
				if(nextNodes.length === 1) {
					currentNode = nextNodes[0];
					var record = new ns.ExterneIntegratieRecord(line, i+1, currentNode);
					records.push(record);
					updateParentIds(record);
				} else {
					var childId = getIdentificatieDetailrecord(line, metadata);
					var parentDepth = determineParentDepth(childId);
					if (parentDepth !== -1) {
						var recordDepth = parentDepth + 1;
						for(var j = 0; j < nextNodes.length; j++) {
							if(nextNodes[j].depth = recordDepth) {
								currentNode = nextNodes[j];
							} 
						}
						result = new ns.ExterneIntegratieRecord(line, lineNumber, currentNode);
						updateParentIds(result);
					} else {
						records.push(new ns.MisplacedRecord(line, i+1, metadata));
					}
				}
			} else {
				records.push(new ns.MisplacedRecord(line, i+1, metadata));
			}
		} else if (line !== "") {
			records.push(new ns.UnknownRecord(line, i+1));
		}
	}
});