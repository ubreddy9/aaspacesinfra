import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string(),
        "cta": z.string(),
        "rail": z.array(z.string())
      }),
      "sectors": z.array(z.object({
        "number": z.string(),
        "name": z.string(),
        "detail": z.string(),
        "id": z.string()
      })),
      "approach": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "steps": z.array(z.object({
          "number": z.string(),
          "title": z.string(),
          "text": z.string(),
          "id": z.string()
        }))
      }),
      "gallery": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "note": z.string(),
        "projects": z.array(z.object({
          "sector": z.string(),
          "title": z.string(),
          "id": z.string()
        }))
      }),
      "cta": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string(),
        "button": z.string()
      })
    }),
    projects: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string()
      }),
      "filters": z.array(z.object({
        "label": z.string(),
        "value": z.string(),
        "id": z.string()
      })),
      "projects": z.array(z.object({
        "title": z.string(),
        "sector": z.string(),
        "filter": z.string(),
        "code": z.string(),
        "description": z.string(),
        "image": z.string(),
        "id": z.string()
      })),
      "note": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "cta": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string(),
        "button": z.string()
      })
    }),
    capabilities: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string()
      }),
      "services": z.array(z.object({
        "title": z.string(),
        "detail": z.string(),
        "number": z.string(),
        "id": z.string()
      })),
      "technical": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "items": z.array(z.object({
          "label": z.string(),
          "detail": z.string(),
          "id": z.string()
        }))
      }),
      "sectors": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "items": z.array(z.object({
          "name": z.string(),
          "detail": z.string(),
          "id": z.string()
        }))
      }),
      "process": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "steps": z.array(z.object({
          "title": z.string(),
          "detail": z.string(),
          "id": z.string()
        }))
      }),
      "cta": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string(),
        "button": z.string()
      })
    }),
    about: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string()
      }),
      "story": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "body": z.array(z.object({
          "text": z.string(),
          "id": z.string()
        }))
      }),
      "commitments": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "items": z.array(z.object({
          "number": z.string(),
          "title": z.string(),
          "detail": z.string(),
          "id": z.string()
        }))
      }),
      "leadership": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string()
      }),
      "footprint": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string(),
        "points": z.array(z.object({
          "label": z.string(),
          "detail": z.string(),
          "id": z.string()
        }))
      }),
      "cta": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string(),
        "button": z.string()
      })
    }),
    proposal: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string()
      }),
      "details": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "items": z.array(z.object({
          "title": z.string(),
          "detail": z.string(),
          "id": z.string()
        }))
      }),
      "form": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "description": z.string()
      }),
      "aside": z.object({
        "title": z.string(),
        "description": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;