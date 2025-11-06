import { Request, Response, Router } from "express";
import { DishDTO } from "#/Dish";
import { MenuDTO } from "#/Menu";
import { DB } from "../db.js";

const D_DB = new DB<DishDTO[]>('dishes', []);
const M_DB = new DB<MenuDTO[]>('menus', []);
const apiRouter = Router();

apiRouter.get('/dishes', async (_req: Request, res: Response) => {
  console.log('GET /dishes called');
  try {
    const dishes = await D_DB.read();
    console.log(`Retrieved ${dishes.length} dishes`);
    return res.status(200).json({ data: dishes });
  } catch (error) {
    console.error('Error retrieving dishes:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

apiRouter.post('/dishes', async (req: Request, res: Response) => {
  console.log('POST /dishes called with body:', req.body);

  if (!req.body.id || !req.body.name || !req.body.category) {
    console.warn('POST /dishes missing attributes');
    return res.status(400).json({ message: 'Missing attributes' });
  }

  const dish: DishDTO = {
    id: req.body.id,
    name: req.body.name,
    category: req.body.category
  }

  try {
    let dishes = await D_DB.read();
    dishes = dishes.filter(m => m.id !== dish.id);
    dishes.push(dish);
    await D_DB.write(dishes);
    console.log(`Dish with id ${dish.id} added/updated`);
    return res.status(200).json({ data: dish });
  } catch (error) {
    console.error('Error writing dishes:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

apiRouter.delete('/dishes/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`DELETE /dishes/${id} called`);
  try {
    let dishes = await D_DB.read();
    dishes = dishes.filter((m) => m.id !== id);
    await D_DB.write(dishes);
    console.log(`Dish with id ${id} deleted`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Error deleting dish with id ${id}:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

apiRouter.get('/menus', async (_req: Request, res: Response) => {
  console.log('GET /menus called');
  try {
    const menus = await M_DB.read();
    console.log(`Retrieved ${menus.length} menus`);
    return res.status(200).json({ data: menus });
  } catch (error) {
    console.error('Error retrieving menus:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

apiRouter.post('/menus', async (req: Request, res: Response) => {
  console.log('POST /menus called with body:', req.body);

  if (!req.body.id || !req.body.date) {
    console.warn('POST /menus missing attributes');
    return res.status(400).json({ message: 'Missing attributes' });
  }

  const menu: MenuDTO = {
    id: req.body.id,
    date: req.body.date,
    soup: req.body.soup,
    main: req.body.main,
    side: req.body.side,
    salad: req.body.salad,
  }

  try {
    let menus = await M_DB.read();
    menus = menus.filter(m => m.id !== menu.id);
    menus.push(menu);
    await M_DB.write(menus);
    console.log(`Menu with id ${menu.id} added/updated`);
    return res.status(200).json({ data: menu });
  } catch (error) {
    console.error('Error writing menus:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

apiRouter.delete('/menus/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`DELETE /menus/${id} called`);
  try {
    let menus = await M_DB.read();
    menus = menus.filter(m => m.id !== id);
    await M_DB.write(menus);
    console.log(`Menu with id ${id} deleted`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Error deleting menu with id ${id}:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

apiRouter.use('*', async (_req: Request, res: Response) => {
  console.warn(`Route not found: ${_req.method} ${_req.originalUrl}`);
  return res.status(404).json({ message: 'route not found' });
})

export default apiRouter;
