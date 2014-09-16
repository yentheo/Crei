var ei;

(function(ns, undefined){
	ns.voorloopRecord = new ei.FieldCollection("01", "VOORLOOPRECORD", [
		new ei.fields.NumericField("Bericht", 3),								new ei.fields.NumericField("Versie", 2),
		new ei.fields.NumericField("Subversie", 2),								new ei.fields.NumericField("Zorgkantoor", 4),		
		new ei.fields.AlphanumericField("IdentificatieHeenbericht", 12),		new ei.fields.DateField("DagtekeningHeenbericht"),
		new ei.fields.AlphanumericField("Reserve", 277)
	]);
	
	ns.clientRecord = new ei.FieldCollection("02", "CLIENTRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("BSN", 9),
		new ei.fields.NumericField("RedenBSNOnbekend", 2),						new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.DateField("Geboortedatum").isMandatory(),
		new ei.fields.NumericField("DatumGebruik", 1),							new ei.fields.NumericField("Geslacht", 1),
		new ei.fields.NumericField("BurgerlijkeStaat", 1),						new ei.fields.AlphanumericField("Naam01", 25),
		new ei.fields.AlphanumericField("Voorvoegsel01", 10),					new ei.fields.NumericField("Naamcode01", 1),
		new ei.fields.AlphanumericField("Naam02", 25),							new ei.fields.AlphanumericField("Voorvoegsel02", 10),
		new ei.fields.NumericField("Naamcode02", 1),							new ei.fields.AlphanumericField("Voorletters", 6),
		new ei.fields.NumericField("Naamcode03", 1),							new ei.fields.NumericField("Leefeenheid", 1),
		new ei.fields.NumericField("Huisarts", 8),								new ei.fields.NumericField("Communicatievorm", 1),
		new ei.fields.AlphanumericField("Communicatietaal", 25),				new ei.fields.NumericField("JuridischeStatus", 2),
		new ei.fields.NumericField("Bopz", 1),									new ei.fields.DateField("DatumBopz", 8),
		new ei.fields.AlphanumericField("Reserve", 125)		
	]);
	
	ns.relatieRecord = new ei.FieldCollection("03", "RELATIERECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.AlphanumericField("Relatienummer", 20),
		new ei.fields.NumericField("Volgorde", 2),								new ei.fields.NumericField("Soort", 2),
		new ei.fields.DateField("Geboortedatum"),								new ei.fields.NumericField("DatumGebruik", 1),
		new ei.fields.NumericField("Geslacht", 1),								new ei.fields.AlphanumericField("Naam01", 25),
		new ei.fields.AlphanumericField("Voorvoegsel01", 10),					new ei.fields.NumericField("Naamcode01", 1),
		new ei.fields.AlphanumericField("Naam02", 25),							new ei.fields.AlphanumericField("Voorvoegsel02", 10),
		new ei.fields.NumericField("Naamcode02", 1),							new ei.fields.AlphanumericField("Voorletters", 6),
		new ei.fields.NumericField("Naamcode03", 1),							new ei.fields.NumericField("Reserve", 159)
	]);
	
	ns.adresRecord = new ei.FieldCollection("04", "ADRESRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.AlphanumericField("Relatienummer", 20),
		new ei.fields.NumericField("Soort", 2),									new ei.fields.NumericField("Huisnummer", 5),
		new ei.fields.AlphanumericField("Huisletter", 1),						new ei.fields.AlphanumericField("Huisnummertoevoeging", 4),
		new ei.fields.AlphanumericField("AanduidingWoonadres", 2),					new ei.fields.AlphanumericField("Postcode", 8),
		new ei.fields.AlphanumericField("Straatnaam", 24),						new ei.fields.AlphanumericField("Plaatsnaam", 24),
		new ei.fields.AlphanumericField("Landcode", 2),							new ei.fields.AlphanumericField("Organisatie", 35),
		new ei.fields.AlphanumericField("Telefoon01", 15),						new ei.fields.AlphanumericField("Landnummer01", 4),
		new ei.fields.AlphanumericField("Telefoon02", 15),						new ei.fields.AlphanumericField("Landnummer02", 4),
		new ei.fields.AlphanumericField("Emailadres", 70),						new ei.fields.DateField("Begindatum"),
		new ei.fields.DateField("Einddatum"),									new ei.fields.AlphanumericField("Reserve", 21)
	]);
	
	ns.ziektebeeldEnStoornisRecord = new ei.FieldCollection("06", "ZIEKTEBEELDENSTOORNISRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("Grondslag", 2),								new ei.fields.NumericField("Diagnosecodelijst", 3),
		new ei.fields.NumericField("SubcodeDiagnosecodelijst", 2),				new ei.fields.AlphanumericField("ZiektebeeldStoornis", 8),
		new ei.fields.NumericField("Prognose", 1),								new ei.fields.AlphanumericField("Reserve", 247)
	]);
	
	ns.beperkingRecord = new ei.FieldCollection("07", "BEPERKINGRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("Beperking", 1),								new ei.fields.NumericField("Duur", 1),
		new ei.fields.AlphanumericField("Reserve", 261)
	]);
	
	ns.indicatiebesluitRecord = new ei.FieldCollection("08", "INDICATIEBESLUITRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("Soort", 1),									new ei.fields.NumericField("Grondslag01", 2),
		new ei.fields.NumericField("Grondslag02", 2),							new ei.fields.DateField("Afgiftedatum"),
		new ei.fields.DateField("Ingangsdatum"),								new ei.fields.DateField("Einddatum"),
		new ei.fields.AlphanumericField("Reserve", 234)
	]);
	
	ns.geindiceerdeFunctieRecord = new ei.FieldCollection("09", "GEINDICEERDFUNCTIERECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("Functiecode", 2),							new ei.fields.DateField("Ingangsdatum"),
		new ei.fields.DateField("Einddatum"),									new ei.fields.AlphanumericField("Klasse", 4),
		new ei.fields.NumericField("Opslag", 2),								new ei.fields.NumericField("Leveringsvoorwaarde", 1),
		new ei.fields.NumericField("Vervoer", 1),								new ei.fields.NumericField("Leveringsvorm", 1),
		new ei.fields.NumericField("InstellingVoorkeur", 8),					new ei.fields.AlphanumericField("Reserve", 228)
	]);
	
	ns.activiteitRecord = new ei.FieldCollection("10", "ACTIVITEITRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("Functiecode", 2),							new ei.fields.DateField("Ingangsdatum"),
		new ei.fields.NumericField("Activiteitcode", 5),						new ei.fields.AlphanumericField("Reserve", 248)
	]);
	
	ns.scoreStoornisRecord = new ei.FieldCollection("12", "SCOORESTOORNISRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("VraagStoornis", 4),							new ei.fields.AlphanumericField("ScoreStoornis", 1),
		new ei.fields.AlphanumericField("Reserve", 258)
	]);
	
	ns.scoreBeperkingRecord = new ei.FieldCollection("13", "SCOREBEPERKINGRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("Beperking", 1),								new ei.fields.NumericField("VraagStoornis", 4),		
		new ei.fields.AlphanumericField("ScoreStoornis", 1),					new ei.fields.AlphanumericField("Reserve", 257)
	]);
	
	ns.geindiceerdZorgzwaartepakketRecord = new ei.FieldCollection("22", "GEINDICEERDZORGZWAARTEPAKKETRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("IndicatieOrgaan", 4),
		new ei.fields.AlphanumericField("Clientnummer", 20),					new ei.fields.NumericField("Besluitnummer", 9),
		new ei.fields.NumericField("Zzp-code", 3),								new ei.fields.DateField("Ingangsdatum"),
		new ei.fields.DateField("Einddatum"),									new ei.fields.AlphanumericField("Klasse", 4),
		new ei.fields.NumericField("Leveringsvorm", 1),							new ei.fields.NumericField("InstellingVoorkeur", 8),					
		new ei.fields.AlphanumericField("Reserve", 231)
	]);
	
	ns.commentaarRecord = new ei.FieldCollection("98", "COMMENTAARRECORD", [
		new ei.fields.NumericField("IdentificatieDetailrecord", 12),			new ei.fields.NumericField("Regelnummer", 4),
		new ei.fields.AlphanumericField("Regel", 140),							new ei.fields.AlphanumericField("Reserve", 152)
	]);
	
	ns.sluitRecord = new ei.FieldCollection("99", "SLUITRECORD", [
		new ei.fields.NumericField("AantalClientrecords", 6),					new ei.fields.NumericField("AantalRelatierecord", 6),
		new ei.fields.NumericField("AantalAdresrecords", 6),					new ei.fields.NumericField("AantalZiektebeeldEnStoornisrecords", 6),
		new ei.fields.NumericField("AantalBeperkingrecords", 6),				new ei.fields.NumericField("AantalIndicatiebesluitrecords", 6),
		new ei.fields.NumericField("AantalFunctierecords", 6),					new ei.fields.NumericField("AantalZorgzwaartepakketrecords", 6),
		new ei.fields.NumericField("AantalActiviteitrecords", 6),				new ei.fields.NumericField("AantalCommentaarrecords", 6),
		new ei.fields.NumericField("AantalScoreStoornisrecords", 6),			new ei.fields.NumericField("AantalScoreBeperkingrecords", 6),
		new ei.fields.NumericField("TotaalAantalDetailrecords", 7),				new ei.fields.AlphanumericField("Reserve", 229)
	]);
	
	ns.bericht = new ei.Berichtstandaard("388", [
		new ei.RecordTypeInstance(ns.voorloopRecord, ei.Multiplicity.Once, []),
		new ei.RecordTypeInstance(ns.clientRecord, ei.Multiplicity.OnceOrMore, [
			new ei.RecordTypeInstance(ns.relatieRecord, ei.Multiplicity.ZeroOrMore, [
				new ei.RecordTypeInstance(ns.adresRecord, ei.Multiplicity.OnceOrMore, [])
			]),
			new ei.RecordTypeInstance(ns.adresRecord, ei.Multiplicity.OnceOrMore, []),
			new ei.RecordTypeInstance(ns.indicatiebesluitRecord, ei.Multiplicity.OnceOrMore, [
				new ei.RecordTypeInstance(ns.ziektebeeldEnStoornisRecord, ei.Multiplicity.ZeroOrMore, [	
					new ei.RecordTypeInstance(ns.commentaarRecord, ei.Multiplicity.ZeroOrMore, [])
				]),
				new ei.RecordTypeInstance(ns.beperkingRecord, ei.Multiplicity.ZeroOrMore, [	
					new ei.RecordTypeInstance(ns.scoreBeperkingRecord, ei.Multiplicity.ZeroOrMore, [	
						new ei.RecordTypeInstance(ns.commentaarRecord, ei.Multiplicity.ZeroOrMore, [])
					]),	
					new ei.RecordTypeInstance(ns.commentaarRecord, ei.Multiplicity.ZeroOrMore, [])
				]),
				new ei.RecordTypeInstance(ns.geindiceerdeFunctieRecord, ei.Multiplicity.ZeroOrMore, [
					new ei.RecordTypeInstance(ns.activiteitRecord, ei.Multiplicity.ZeroOrMore, []),	
					new ei.RecordTypeInstance(ns.commentaarRecord, ei.Multiplicity.ZeroOrMore, [])
				]),
				new ei.RecordTypeInstance(ns.scoreStoornisRecord, ei.Multiplicity.ZeroOrMore, []),
				new ei.RecordTypeInstance(ns.geindiceerdZorgzwaartepakketRecord, ei.Multiplicity.ZeroOrMore, [	
					new ei.RecordTypeInstance(ns.commentaarRecord, ei.Multiplicity.ZeroOrMore, [])
				]),
				new ei.RecordTypeInstance(ns.commentaarRecord, ei.Multiplicity.ZeroOrMore, [])
			]),	
			new ei.RecordTypeInstance(ns.commentaarRecord, ei.Multiplicity.ZeroOrMore, [])
		]),
		new ei.RecordTypeInstance(ns.sluitRecord, ei.Multiplicity.Once, []),
	]);
})((ei = ei || {},ei.metadata = ei.metadata || {}, ei.metadata.io31 = ei.metadata.io31 || {}));