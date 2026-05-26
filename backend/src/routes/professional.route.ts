import { Router } from "express";
import { 
  createProfessional, 
  getProfessionals, 
  getProfessionalById, 
  updateProfessional, 
  deleteProfessional,
  trackCtaClick,
  createMyProfessionalProfile
} from "../controllers/professional.controller.js";
import { protectRoute, adminRoute, superAdminRoute } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Professional:
 *       type: object
 *       required:
 *         - name
 *         - profession
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the professional
 *         name:
 *           type: string
 *         profession:
 *           type: string
 *         bio:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     ProfessionalInput:
 *       type: object
 *       required:
 *         - name
 *         - profession
 *       properties:
 *         name:
 *           type: string
 *         profession:
 *           type: string
 *         bio:
 *           type: string
 */

/**
 * @openapi
 * /api/v1/professionals:
 *   get:
 *     summary: Get all professionals
 *     tags: [Professionals]
 *     responses:
 *       200:
 *         description: List of professionals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professional'
 *   post:
 *     summary: Create a new professional by admin
 *     tags: [Professionals]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalInput'
 *     responses:
 *       201:
 *         description: Professional created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professional'
 *       401:
 *         description: Unauthorized (missing token)
 *       403:
 *         description: Forbidden (requires admin privileges)
 */
router.get("/", protectRoute, superAdminRoute, getProfessionals);
router.post("/", protectRoute,adminRoute, superAdminRoute, createProfessional);

/**
 * @openapi
 * /api/v1/professionals/me:
 *   post:
 *     summary: Create a new professional profile
 *     tags: [Professionals]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalInput'
 *     responses:
 *       201:
 *         description: Professional created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professional'
 *       401:
 *         description: Unauthorized (missing token)
 *       403:
 *         description: Forbidden (requires admin privileges)
 */
router.post("/me", protectRoute, createMyProfessionalProfile);


/**
 * @openapi
 * /api/v1/professionals/{id}:
 *   get:
 *     summary: Get a professional by ID
 *     tags: [Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The professional ID
 *     responses:
 *       200:
 *         description: Professional found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professional'
 *       404:
 *         description: Professional not found
 *   patch:
 *     summary: Update a professional
 *     tags: [Professionals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The professional ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalInput'
 *     responses:
 *       200:
 *         description: Professional updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Professional not found
 *   delete:
 *     summary: Delete a professional
 *     tags: [Professionals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The professional ID
 *     responses:
 *       200:
 *         description: Professional deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Professional not found
 */
router.get("/:id", protectRoute, getProfessionalById);
router.patch("/:id", protectRoute, updateProfessional);
router.delete("/:id", protectRoute, superAdminRoute, deleteProfessional);

/**
 * @openapi
 * /api/v1/professionals/{id}/cta/click:
 *   post:
 *     summary: Track a CTA click for a professional
 *     tags: [Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The professional ID
 *     responses:
 *       200:
 *         description: Click tracked successfully
 *       404:
 *         description: Professional not found
 */
router.post("/:id/cta/click", protectRoute, trackCtaClick);

export default router;
