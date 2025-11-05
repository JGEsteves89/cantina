import { Request, Response, Router } from "express";
import { DishDTO } from "#/Dish";
import { MenuDTO } from "#/Menu";
import { DB } from "../db.js";

const D_DB = new DB<DishDTO[]>('dishes', []);
const M_DB = new DB<MenuDTO[]>('menus', []);
const apiRouter = Router();

apiRouter.get('/dishes', async (_req: Request, res: Response) => {
  const dishes = await D_DB.read();
  return res.status(200).json({ data: dishes });
})

apiRouter.post('/dishes', async (req: Request, res: Response) => {

  if (!req.body.id || !req.body.name || !req.body.category) return res.status(400).json({ message: 'Missing attributes' });

  const dish: DishDTO = {
    id: req.body.id,
    name: req.body.name,
    category: req.body.category
  }

  let dishes = await D_DB.read();
  dishes = dishes.filter(m => m.id !== dish.id);
  dishes.push(dish);
  await D_DB.write(dishes)

  return res.status(200).json({ data: dish });
})

apiRouter.delete('/dishes/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  let dishes = await D_DB.read();
  dishes = dishes.filter((m) => m.id !== id);
  await D_DB.write(dishes);
  res.status(200).json({ success: true });
});

apiRouter.get('/menus', async (_req: Request, res: Response) => {
  const menus = await M_DB.read();
  return res.status(200).json({ data: menus });
})

apiRouter.post('/menus', async (req: Request, res: Response) => {

  if (!req.body.id || !req.body.date) return res.status(400).json({ message: 'Missing attributes' });

  const menu: MenuDTO = {
    id: req.body.id,
    date: req.body.date,
    soup: req.body.soup,
    main: req.body.main,
    side: req.body.side,
    salad: req.body.salad,
  }

  let menus = await M_DB.read();
  menus = menus.filter(m => m.id !== menu.id);
  menus.push(menu);
  await M_DB.write(menus)

  return res.status(200).json({ data: menu });
})

apiRouter.delete('/menus/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  let menus = await M_DB.read();
  menus = menus.filter(m => m.id !== id);
  await M_DB.write(menus)

  return res.status(200);
})


apiRouter.use('*', async (_req: Request, res: Response) => {
  return res.status(404).json({ message: 'route not found' });
})

export default apiRouter;