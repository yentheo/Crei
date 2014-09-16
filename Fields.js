var ei;

(function(ns, undefined) {
	function isMandatory() {
		this._isMandatory = true;
		return this;
	};

	ns.DateField = function(name) {
		var id = "";
		Object.defineProperty(this, "id", { get: function() { return id; }, set: function(value) { id = value; } });
		Object.defineProperty(this, "name", { get: function() { return name; } });
		Object.defineProperty(this, "length", { get: function() { return 8; } });
		this._isMandatory = false;
	};
	
	ns.DateField.dateRegex = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
	ns.DateField.emptyValue = "00000000";
	
	ns.DateField.prototype.isValid = function(value) {
		if(this._isMandatory) {
			return ns.DateField.dateRegex.test(value);
		} else {
			return value === ns.DateField.emptyValue ? true : ns.DateField.dateRegex.test(value);
		}
	};
	
	ns.DateField.prototype.serialize = function(value) {
		return value;
	};
	
	ns.DateField.prototype.deserialize = function(value) {
		return value;
	};
	
	ns.DateField.prototype.isMandatory = isMandatory;

	ns.AlphanumericField = function(name, length) {
		var id = "";
		Object.defineProperty(this, "id", { get: function() { return id; }, set: function(value) { id = value; } });
		Object.defineProperty(this, "name", { get: function() { return name; } });
		Object.defineProperty(this, "length", { get: function() { return length; } });
		this._isMandatory = false;
	}
							  
	ns.AlphanumericField.prototype.isValid = function(value) {
		return value.length <= this.length;
	};
	
	ns.AlphanumericField.prototype.serialize = function(value) {
		if(value.length >= this.length) {
			return value.substring(0, this.length);
		} else {
			var missingAmount = this.length - value.length;
			var spacing = new Array(missingAmount).join(" ") + " ";
			return value.concat(spacing);
		}
	};
	
	ns.AlphanumericField.prototype.deserialize = function(value) {
		return value.trim();
	};
	
	ns.AlphanumericField.prototype.isMandatory = isMandatory;

	ns.NumericField = function(name, length) {
		var id = "";
		Object.defineProperty(this, "id", { get: function() { return id; }, set: function(value) { id = value; } });
		Object.defineProperty(this, "name", { get: function() { return name; } });
		Object.defineProperty(this, "length", { get: function() { return length; } });
		this._isMandatory = false;
	}
							  
	ns.NumericField.prototype.isValid = function(value) {
		return value.toString().length <= this.length && !isNaN(value);
	};
	
	ns.NumericField.prototype.serialize = function(value) {
		if(isNaN(value)) {
			throw new Error("Cannot serialize a non numeric value: '" + value + "'");
		}
		value = value.toString();
		if(value.length >= this.length) {
			return value.substring(0, this.length);
		} else {
			var missingAmount = this.length - value.length;
			var spacing = new Array(missingAmount).join("0") + "0";
			var serializedValue = spacing.concat(value);
			return serializedValue;
		}
	};
	
	ns.NumericField.prototype.deserialize = function(value) {
		while(value[0] == "0") {
			value = value.substring(1, value.length);
		}
		return value == "" ? 0 : new Number(value);
	};
	
	ns.NumericField.prototype.isMandatory = isMandatory;
})((ei = ei || {}, ei.fields = ei.fields || {}));