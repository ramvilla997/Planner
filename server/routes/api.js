// server/routes/api.js

router.get('/shopping-list', async (req, res) => {
    try {
      const userId = req.user._id;
      const shoppingList = await ShoppingList.findOne({ user: userId });
      res.status(200).send(shoppingList);
    } catch (error) {
      res.status(500).send('Error fetching shopping list');
    }
  });
  
  router.delete('/shopping-list/:itemId', async (req, res) => {
    try {
      const userId = req.user._id;
      const { itemId } = req.params;
      const shoppingList = await ShoppingList.findOne({ user: userId });
  
      shoppingList.items = shoppingList.items.filter(item => item._id.toString() !== itemId);
      await shoppingList.save();
  
      res.status(200).send(shoppingList);
    } catch (error) {
      res.status(500).send('Error removing item from shopping list');
    }
  });
  