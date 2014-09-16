var ei;

(function(ns, undefined){

	function padZero(value) {
		if(value.length == 1) {
			return "0" + value;
		}
		else return value;
	}

	ns.FieldCollection = function(kenmerk, displayName, fields) {
		var self = this;
		Object.defineProperty(this, "kenmerk", { get: function() { return kenmerk; }, enumerable: false	});
		Object.defineProperty(this, "displayName", { get: function() { return displayName; }, enumerable: false });    
		fields.unshift(new ns.fields.NumericField("Kenmerk", 2));		
		Object.defineProperty(this, "totalLength", { get: function() { return calculateTotalLength(); }, enumerable: false });    
		
		function calculateTotalLength() {
			var totalLength = 0;
			for(var i = 0; i < self.fields.length; i++) {
				totalLength += self.fields[i].length;
			}
			return totalLength;
		};
		
		function initialize() {
			var start = 0, end = 0;
			for(var i = 0; i < fields.length; i++) {
				var field = fields[i];
				end = end + field.length;
				field.startPosition = start;
				field.endPosition = end;
				field.id = padZero(i.toString());
				self[field.name] = field;
				Object.defineProperty(self, field.id, { get: function() { return field; }, enumerable: false });
				start = end;
			}
		}
		
		initialize();
	};
	
	function deserializeRecord(line, metadata) {
		var start = 0, end = 0;
		for(var name in metadata) {
			var field = metadata[name];
			end += field.length;
			this[field.name] = field.deserialize(line.substring(start, end));
			start = end;			
		}
	}
	
	ns.ExterneIntegratieRecord = function(line, lineNumber, recordNode) {
		var self = this;
		Object.defineProperty(this, "line", { get: function() { return line; }});
		Object.defineProperty(this, "lineNumber", { get: function() { return lineNumber; }});
		Object.defineProperty(this, "recordNode", { get: function() { return recordNode; }});
		
		deserializeRecord.call(this, line, recordNode.metadata);
	};
	
	ns.MisplacedRecord = function(line, lineNumber, metadata, expectedRecords) {
		var self = this;
		Object.defineProperty(this, "line", { get: function() { return line; }});
		Object.defineProperty(this, "lineNumber", { get: function() { return lineNumber; }});
		Object.defineProperty(this, "metadata", { get: function() { return metadata; }});
		Object.defineProperty(this, "expectedRecords", { get: function() { return expectedRecords; }});
		
		deserializeRecord.call(this, line, metadata);	
	}
	
	ns.UnknownRecord = function(line, lineNumber) {
		Object.defineProperty(this, "line", { get: function() { return line; }});
		Object.defineProperty(this, "lineNumber", { get: function() { return lineNumber; }});	
	};
	
	var determinePossibleFollowUps = function() {
		var self = this;
		for(var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			this.possibleFollowUps.push(child);
			if(child.isMandatory) { return; }
		}
		
		var walker = this;
		while(walker) {
			var stop = findPossibleFollowUpsLookback(walker);
			if(stop) { return; }
			walker = walker.parent;
		}
		
		function followingSiblings(current) {
			var siblings = [], iterator, sibling;
			
			if(current.parent) {
				iterator = current.parent.children.entries();
			} else {
				iterator = [].entries();
			}
			
			while(sibling = iterator.next().value) {
				if(sibling[1] == current) { break; }
			}
			
			while(sibling = iterator.next().value) {
				siblings.push(sibling[1]);
			}
			
			return siblings;
		}
		
		function findPossibleFollowUpsLookback(current) {
			var siblings = followingSiblings(current);
			
			if ((current.multiplicity & ns.Multiplicity.Many) === ns.Multiplicity.Many)
            {
                self.possibleFollowUps.push(current);
            }
			
			for(var i = 0; i < siblings.length; i++)
            {
                self.possibleFollowUps.push(siblings[i]);
                if (siblings[i].isMandatory) return true;
            }
			
			return false;
		}
	}
	
	function isPossibleFollowUp(metadata) {
		for(var i = 0; i < this.possibleFollowUps.length; i++) {
			var possibleFollowUp = this.possibleFollowUps[i];
			if(possibleFollowUp.metadata == metadata) {
				return true;
			}
		}
		return false;
	}
	
	function flatList() {
		var flat = [];
		
		for(var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			flat.push(child);
			flat = flat.concat(child.flatList());
		}
		
		return flat;
	}
	
	function findPossibleFollowUps(metadata) {
		var possibleFollowUps = [];
		for(var i = 0; i < this.possibleFollowUps.length; i++) {
			if(this.possibleFollowUps[i].metadata === metadata) {
				possibleFollowUps.push(this.possibleFollowUps[i]);
			}
		}
		return possibleFollowUps;
	}
	
	ns.Berichtstandaard = function(berichtCode, hierarchy) {
		var knownRecordTypes = [], self = this, possibleFollowUps = [], maxDepth = 0;
		Object.defineProperty(this, "berichtCode", { get: function() { return berichtCode; }});
		Object.defineProperty(this, "multiplicity", { get: function() { return ns.Multiplicity.Once; }});
		Object.defineProperty(this, "children", { get: function() { return hierarchy; }});
		Object.defineProperty(this, "possibleFollowUps", { get: function() { return possibleFollowUps; }});
		
		Object.defineProperty(this, "knownRecordTypes", { get: function() { return knownRecordTypes; }, set: function(value) { knownRecordTypes = value; }});
		
		Object.defineProperty(this, "isOptional", { get: function() { return false; } });
		Object.defineProperty(this, "isMandatory", { get: function() { return true; } });
		
		Object.defineProperty(this, "maxDepth", { get: function() { return true; } });
		
		function initializeKnownRecordTypes() {
			var distinct = self.distinctChildren();
			for(var i = 0; i < distinct.length; i++) {
				self.knownRecordTypes[distinct[i].kenmerk] = distinct[i];
			}
		}
		
		function initialize() {
			for(var i = 0; i < self.children.length; i++) {
				self.children[i].parent = self;
			}
		}
		
		function initializeDepth() {
			for(var i = 0; i < self.children.length; i++) {
				self.children[i].initializeDepth();
			}		
		}
		
		function initializePossibleFollowUps() {
			self.determinePossibleFollowUps();
			var flat = self.flatList();
			for(var i = 0; i < flat.length; i++) {
				flat[i].determinePossibleFollowUps();
			}
		}
		
		function initializeMaxDepth() {
			var flat = self.flatList();
			for(var i = 0; i < flat.length; i++) {
				if(flat[i].depth > maxDepth) {
					maxDepth = flat[i].depth;
				}
			}
		}
		
		initialize();
		initializeDepth();
		initializePossibleFollowUps();
		initializeMaxDepth();
		initializeKnownRecordTypes();
	};
	
	ns.Berichtstandaard.prototype.distinctChildren = function() {
		var distinct = [], children = this.flatList();
		for(var i = 0; i < children.length; ++i){
			if(distinct.indexOf(children[i].metadata) == -1) {
				distinct.push(children[i].metadata);
			}
		}
		return distinct;
	};
	
	ns.Berichtstandaard.prototype.findPossibleFollowUps = findPossibleFollowUps;
	
	ns.Berichtstandaard.prototype.flatList = flatList;
	
	ns.Berichtstandaard.prototype.determinePossibleFollowUps = determinePossibleFollowUps;
	
	ns.Berichtstandaard.prototype.isPossibleFollowUp = isPossibleFollowUp;
	
	ns.Berichtstandaard.prototype.isValidKenmerk = function(kenmerk) {
		return !!this.knownRecordTypes[kenmerk];
	};
	
	ns.Berichtstandaard.prototype.getMetadata = function(kenmerk) {
		return this.knownRecordTypes[kenmerk];
	};
	
	ns.Multiplicity = {
		Zero: 1,
		Once: 2,
		Many: 4,
		ZeroOrMore: 1 | 4,
		OnceOrMore: 2 | 4,
		ZeroOrOnce: 1 | 2
	};
	
	ns.RecordTypeInstance = function(metadata, multiplicity, children) {
		var possibleFollowUps = [], parent, depth = 0, self = this, possibleFollowUps = [];
		Object.defineProperty(this, "multiplicity", { get: function() { return multiplicity; }});
		Object.defineProperty(this, "metadata", { get: function() { return metadata; }});
		Object.defineProperty(this, "children", { get: function() { return children; }});
		Object.defineProperty(this, "possibleFollowUps", { get: function() { return possibleFollowUps; }});
		
		Object.defineProperty(this, "isOptional", { get: function() { return (multiplicity & ns.Multiplicity.Zero) === ns.Multiplicity.Zero; } });
		Object.defineProperty(this, "isMandatory", { get: function() { return !this.isOptional; } });
		Object.defineProperty(this, "parent", { get: function() { return parent; }, set: function(value) { parent = value; } });
		Object.defineProperty(this, "depth", { get: function() { return depth; }, set: function(value) { depth = value; } });
		
		function initialize() {
			for(var i = 0; i < self.children.length; i++) {
				self.children[i].parent = self;
			}
		}
		
		initialize();
	};
	
	ns.RecordTypeInstance.prototype.findPossibleFollowUps = findPossibleFollowUps;
	
	ns.RecordTypeInstance.prototype.flatList = flatList;
	
	ns.RecordTypeInstance.prototype.determinePossibleFollowUps = determinePossibleFollowUps;
	
	ns.RecordTypeInstance.prototype.isPossibleFollowUp = isPossibleFollowUp;
	
	ns.RecordTypeInstance.prototype.initializeDepth = function() {
		if(this.parent && this.parent.depth !== undefined) {
			this.depth = this.parent.depth + 1;
		}
		
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].initializeDepth();
		}	
	};
	
	ns.EIReader = function(berichtstandaard) {
		Object.defineProperty(this, "berichtstandaard", { get: function() { return berichtstandaard; }});	
	};
	
	ns.EIReader.prototype.read = function(file, clientReadCallback) {
		var self = this;
		var reader = new FileReader(), parentIds = [];
		
		reader.onload = function(e) {
			var lines = reader.result.split("\r\n");
			var records = [], currentNode = self.berichtstandaard;
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
			clientReadCallback(records);
		};
		
		function determineParentDepth(childId) {
			if(childId < 1) {
				return -1;
			}	
				
			var depth = 0;
			
            while (depth < self.berichtstandaard.maxDepth && parentIds[depth] != childId) {
                depth++;
			}
			
            if (depth == self.berichtstandaard.maxDepth) {
                return -1;
			}
			
            return depth;
		}
		
		function getIdentificatieDetailrecord(line, metadata) {
			var field = metadata["IdentificatieDetailrecord"];
			return field.deserialize(line.substring(field.startPosition, field.endPosition));
		};
		
		function updateParentIds(record) {
			if(record["IdentificatieDetailrecord"]) {
				parentIds[record.recordNode.depth] = record["IdentificatieDetailrecord"];
			}
		}
		
		reader.readAsText(file);
	};
})(window.ei = window.ei || {});
