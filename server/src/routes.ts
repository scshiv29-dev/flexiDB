import { Router, Request, Response } from 'express';
import {
  pullAndCreateContainer,
  getContainerLogs,
  restartContainer,
  startContainer,
  stopContainer,
  deleteContainer,
  getContainerStatus,
  getContainerInfo,
  changeContainerEnvVariable,
  getContainerEnvVariables,
} from './dockersol'

const router = Router();

// API route to pull and create a container
router.post('/containers', async (req: Request, res: Response) => {
  try {
    // Extract required information from the request body
    const { name, dockerImage, tag, ENV, PORT } = req.body;

    // Call the function to pull and create a container
    const containerId = await pullAndCreateContainer({ name, dockerImage, tag, ENV, PORT });

    // Respond with the containerId
    res.status(201).json({ containerId });
  } catch (error) {
    // Handle errors and respond with an appropriate status code
    console.error('Error creating container:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to get container logs
router.get('/containers/:id/logs', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Call the function to get container logs
    const logs = await getContainerLogs(id);

    // Respond with the logs
    res.status(200).send(logs);
  } catch (error) {
    // Handle errors and respond with an appropriate status code
    console.error('Error getting container logs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to restart a container
router.post('/containers/:id/restart', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Call the function to restart a container
    await restartContainer(id);

    // Respond with success
    res.status(204).send();
  } catch (error) {
    // Handle errors and respond with an appropriate status code
    console.error('Error restarting container:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// API route to restart a container
router.post('/containers/:id/start', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Call the function to restart a container
      await startContainer(id);
  
      // Respond with success
      res.status(204).send();
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error starting container:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

// API route to stop a container
router.post('/containers/:id/stop', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Call the function to restart a container
      await stopContainer(id);
  
      // Respond with success
      res.status(204).send();
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error restarting container:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// API route to delete a container
router.post('/containers/:id/delete', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Call the function to restart a container
      await deleteContainer(id);
  
      // Respond with success
      res.status(204).send();
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error restarting container:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// API route to restart a container
router.post('/containers/:id/restart', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Call the function to restart a container
      await restartContainer(id);
  
      // Respond with success
      res.status(204).send();
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error restarting container:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// API route to get container status
router.get('/containers/:id/status', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Call the function to get container status
      const status = await getContainerStatus(id);
  
      // Respond with the container status
      res.status(200).json({ status });
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error getting container status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // API route to get container information
  router.get('/containers/:id/info', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Call the function to get container information
      const containerInfo = await getContainerInfo(id);
  
      // Respond with the container information
      res.status(200).json({ containerInfo });
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error getting container information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // API route to change container environment variable
  router.patch('/containers/:id/env', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { key, value } = req.body;
    try {
      // Call the function to change container environment variable
      await changeContainerEnvVariable(id, key, value);
  
      // Respond with success
      res.status(204).send();
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error changing container environment variable:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // API route to get container environment variables
  router.get('/containers/:id/env', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Call the function to get container environment variables
      const envVariables = await getContainerEnvVariables(id);
  
      // Respond with the environment variables
      res.status(200).json({ envVariables });
    } catch (error) {
      // Handle errors and respond with an appropriate status code
      console.error('Error getting container environment variables:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
export default router;
