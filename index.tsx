/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { routerService } from './src/services/routerService';
import { initializeMotionSystem } from './src/components/motion/MotionSystem';

// Initialize the application with new architecture
routerService.initialize();

// Initialize motion system for animations
initializeMotionSystem();
