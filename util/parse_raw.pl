#!/usr/bin/perl

open(FILEH,$ARGV[0]);
my @filec = <FILEH>;
close(FILEH);

my @pprts = split(/\//,$ARGV[0]);
my $month = $pprts[scalar(@pprts) - 2];
my $day = $pprts[scalar(@pprts) - 1];
$day =~ s/\..*//;
$month = "0$month" if ($month < 10);
$day = "0$day" if ($day < 10);

my $rootPath = $ARGV[0];
$rootPath =~ s/\/raw_inputs\/.*//;

my $templateJson = "data/series/daily/template.json";
my $destinationJson = "$rootPath/data/series/daily/$month$day.json";

my $rc = `cp $rootPath/$templateJson $destinationJson`;

my $conHash;
my $conHashR;
$conHash->{"Genesis"}="Genesis";
$conHash->{"Exodus"}="Exodus";
$conHash->{"Leviticus"}="Leviticus";
$conHash->{"Numbers"}="Numbers";
$conHash->{"Deuteronomy"}="Deuteronomy";
$conHash->{"Joshua"}="Joshua";
$conHash->{"Judges"}="Judges";
$conHash->{"Ruth"}="Ruth";
$conHash->{"1Sam"}="1 Samuel";
$conHash->{"2Samuel"}="2 Samuel";
$conHash->{"Kings"}="1 Kings";
$conHash->{"2Kgs"}="2 Kings";
$conHash->{"Chronicles"}="1 Chronicles";
$conHash->{"2Chr"}="2 Chronicles";
$conHash->{"Ezra"}="Ezra";
$conHash->{"Nehemiah"}="Nehemiah";
$conHash->{"Esther"}="Esther";
$conHash->{"Job"}="Job";
$conHash->{"Psalms"}="Psalms";
$conHash->{"Proverbs"}="Proverbs";
$conHash->{"Ecclesiastes"}="Ecclesiastes";
$conHash->{"Songs"}="Song of Songs";
$conHash->{"Isaiah"}="Isaiah";
$conHash->{"Jeremiah"}="Jeremiah";
$conHash->{"Lamentations"}="Lamentations";
$conHash->{"Ezekiel"}="Ezekiel";
$conHash->{"Daniel"}="Daniel";
$conHash->{"Hosea"}="Hosea";
$conHash->{"Joel"}="Joel";
$conHash->{"Amos"}="Amos";
$conHash->{"Obadiah"}="Obadiah";
$conHash->{"Jonah"}="Jonah";
$conHash->{"Micah"}="Micah";
$conHash->{"Nahum"}="Nahum";
$conHash->{"Habakkuk"}="Habakkuk";
$conHash->{"Zephaniah"}="Zephaniah";
$conHash->{"Haggai"}="Haggai";
$conHash->{"Zechariah"}="Zechariah";
$conHash->{"Malachi"}="Malachi";
$conHash->{"Matthew"}="Matthew";
$conHash->{"Mark"}="Mark";
$conHash->{"Luke"}="Luke";
$conHash->{"John"}="John";
$conHash->{"Acts"}="Acts";
$conHash->{"Romans"}="Romans";
$conHash->{"Corinthians"}="1 Corinthians";
$conHash->{"2Cor"}="2 Corinthians";
$conHash->{"Galatians"}="Galatians";
$conHash->{"Ephesians"}="Ephesians";
$conHash->{"Philippians"}="Philippians";
$conHash->{"Colossians"}="Colossians";
$conHash->{"Thessalonians"}="1 Thessalonians";
$conHash->{"2Thes"}="2 Thessalonians";
$conHash->{"Timothy"}="1 Timothy";
$conHash->{"2Tim"}="2 Timothy";
$conHash->{"Titus"}="Titus";
$conHash->{"Philemon"}="Philemon";
$conHash->{"Hebrews"}="Hebrews";
$conHash->{"James"}="James";
$conHash->{"Peter"}="1 Peter";
$conHash->{"2Pet"}="2 Peter";
$conHash->{"1Jn"}="1 John";
$conHash->{"2Jn"}="2 John";
$conHash->{"3Jn"}="3 John";
$conHash->{"Jude"}="Jude";
$conHash->{"Revelation"}="Revelation";

foreach my $bookName (keys %$conHash)
{
   $conHashR->{$conHash->{$bookName}} = $bookName;
}
#fix
$conHashR->{"Psalm"}="Psalms";

my $found = 0;
my $fH;
my $dateString;

open(TOUT,">$rootPath/temp-$month$day.html");
foreach my $line (@filec)
{
	$found = 1 if ($line =~ /\<h2\>Daily Devotional\<\/h2\>/i);
	if (($found == 1) && ($line =~ /div class="bible-passages"/i))
	{
		$found = 2;
	} elsif ($found == 2) {
		if ($line =~ /\<\/div\>/) {
			$found = 0;
		} else {
			$line =~ s/^\s*//;
			print TOUT $line;
		}
	}
	if ($line =~ /li id=\"t_(..)\"\><a href=\".\"\>([^<]*)\<\/a/)
	{
		$fH->{$1} = $2;
	}
	if ($line =~ /<h3>([^<]*) 20..<\/h3>/)
	{
		$dateString = "$1";
	}
}
close(TOUT);

my $psgHash;

foreach $kName (sort keys %$fH)
{
	#print "$kName == $fH->{$kName}\n";
	my @parts = split(/ /,$fH->{$kName});
	if ($parts[0] =~ /\d/)
	{
		$parts[0] = "$parts[0] $parts[1]";
		$parts[1] = $parts[2];
	} elsif ($parts[1] eq "of")
	{
		$parts[0] = "$parts[0] $parts[1] $parts[2]";
		$parts[1] = $parts[3];
	}
	#	print "$conHashR->{$parts[0]}.$parts[1]\n";
	$psgHash->{"$kName-passage"} = "$conHashR->{$parts[0]}.$parts[1]";
	unless ($conHashR->{$parts[0]})
	{
		print "ERR: $parts[0] not found!\n";
	}
}

#print "Date String: $dateString\n";

###########################
#

print "\n\n";

open(FILEH,$destinationJson);
my @fContents = <FILEH>;
close(FILEH);

open(TTOUT,">$destinationJson");
foreach my $line (@fContents)
{
	$line =~ s/\"subtitle\": \"-Month-,/\"subtitle\": \"$dateString/;
	print TTOUT $line;
}
close(TTOUT);

print "yarn start devotion -f $destinationJson -s $rootPath/temp-$month$day.html\n";

foreach $passage (sort keys %$psgHash)
{
	print "yarn start passage -f $destinationJson -p \"$passage\" -r '$psgHash->{$passage}'\n";
}
