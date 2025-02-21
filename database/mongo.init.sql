db.createUser({
    user: "sujal",
    pwd: "sujal123",
    roles: [{ role: "readWrite", db: "inventoryDB" }]
});
