UPDATE cityloc
SET
	price = cityinf."21-Apr"
FROM cityinf
WHERE
	cityloc."City" = cityinf."City"

