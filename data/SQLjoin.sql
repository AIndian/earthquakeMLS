SELECT "cityloc"."City", "Latitude", "Longitude", "housePrices"."21-Apr"
INTO cityinfo
FROM "cityloc"
JOIN "housePrices"
on "housePrices"."City" = "cityloc"."City"
