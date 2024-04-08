import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const PersonScalarFieldEnumSchema = z.enum(['id','name','email','phone','lastContacted','birthday']);

export const UrlScalarFieldEnumSchema = z.enum(['id','personId','url','description']);

export const NoteScalarFieldEnumSchema = z.enum(['id','personId','note','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PERSON SCHEMA
/////////////////////////////////////////

export const PersonSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  lastContacted: z.coerce.date().nullable(),
  birthday: z.coerce.date().nullable(),
})

export type Person = z.infer<typeof PersonSchema>

// PERSON RELATION SCHEMA
//------------------------------------------------------

export type PersonRelations = {
  urls: UrlWithRelations[];
  notes: NoteWithRelations[];
};

export type PersonWithRelations = z.infer<typeof PersonSchema> & PersonRelations

export const PersonWithRelationsSchema: z.ZodType<PersonWithRelations> = PersonSchema.merge(z.object({
  urls: z.lazy(() => UrlWithRelationsSchema).array(),
  notes: z.lazy(() => NoteWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// URL SCHEMA
/////////////////////////////////////////

export const UrlSchema = z.object({
  id: z.number().int(),
  personId: z.number().int(),
  url: z.string(),
  description: z.string().nullable(),
})

export type Url = z.infer<typeof UrlSchema>

// URL RELATION SCHEMA
//------------------------------------------------------

export type UrlRelations = {
  person: PersonWithRelations;
};

export type UrlWithRelations = z.infer<typeof UrlSchema> & UrlRelations

export const UrlWithRelationsSchema: z.ZodType<UrlWithRelations> = UrlSchema.merge(z.object({
  person: z.lazy(() => PersonWithRelationsSchema),
}))

/////////////////////////////////////////
// NOTE SCHEMA
/////////////////////////////////////////

export const NoteSchema = z.object({
  id: z.number().int(),
  personId: z.number().int(),
  note: z.string(),
  createdAt: z.coerce.date(),
})

export type Note = z.infer<typeof NoteSchema>

// NOTE RELATION SCHEMA
//------------------------------------------------------

export type NoteRelations = {
  person: PersonWithRelations;
};

export type NoteWithRelations = z.infer<typeof NoteSchema> & NoteRelations

export const NoteWithRelationsSchema: z.ZodType<NoteWithRelations> = NoteSchema.merge(z.object({
  person: z.lazy(() => PersonWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PERSON
//------------------------------------------------------

export const PersonIncludeSchema: z.ZodType<Prisma.PersonInclude> = z.object({
  urls: z.union([z.boolean(),z.lazy(() => UrlFindManyArgsSchema)]).optional(),
  notes: z.union([z.boolean(),z.lazy(() => NoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PersonCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PersonArgsSchema: z.ZodType<Prisma.PersonDefaultArgs> = z.object({
  select: z.lazy(() => PersonSelectSchema).optional(),
  include: z.lazy(() => PersonIncludeSchema).optional(),
}).strict();

export const PersonCountOutputTypeArgsSchema: z.ZodType<Prisma.PersonCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PersonCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PersonCountOutputTypeSelectSchema: z.ZodType<Prisma.PersonCountOutputTypeSelect> = z.object({
  urls: z.boolean().optional(),
  notes: z.boolean().optional(),
}).strict();

export const PersonSelectSchema: z.ZodType<Prisma.PersonSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  lastContacted: z.boolean().optional(),
  birthday: z.boolean().optional(),
  urls: z.union([z.boolean(),z.lazy(() => UrlFindManyArgsSchema)]).optional(),
  notes: z.union([z.boolean(),z.lazy(() => NoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PersonCountOutputTypeArgsSchema)]).optional(),
}).strict()

// URL
//------------------------------------------------------

export const UrlIncludeSchema: z.ZodType<Prisma.UrlInclude> = z.object({
  person: z.union([z.boolean(),z.lazy(() => PersonArgsSchema)]).optional(),
}).strict()

export const UrlArgsSchema: z.ZodType<Prisma.UrlDefaultArgs> = z.object({
  select: z.lazy(() => UrlSelectSchema).optional(),
  include: z.lazy(() => UrlIncludeSchema).optional(),
}).strict();

export const UrlSelectSchema: z.ZodType<Prisma.UrlSelect> = z.object({
  id: z.boolean().optional(),
  personId: z.boolean().optional(),
  url: z.boolean().optional(),
  description: z.boolean().optional(),
  person: z.union([z.boolean(),z.lazy(() => PersonArgsSchema)]).optional(),
}).strict()

// NOTE
//------------------------------------------------------

export const NoteIncludeSchema: z.ZodType<Prisma.NoteInclude> = z.object({
  person: z.union([z.boolean(),z.lazy(() => PersonArgsSchema)]).optional(),
}).strict()

export const NoteArgsSchema: z.ZodType<Prisma.NoteDefaultArgs> = z.object({
  select: z.lazy(() => NoteSelectSchema).optional(),
  include: z.lazy(() => NoteIncludeSchema).optional(),
}).strict();

export const NoteSelectSchema: z.ZodType<Prisma.NoteSelect> = z.object({
  id: z.boolean().optional(),
  personId: z.boolean().optional(),
  note: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  person: z.union([z.boolean(),z.lazy(() => PersonArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PersonWhereInputSchema: z.ZodType<Prisma.PersonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PersonWhereInputSchema),z.lazy(() => PersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PersonWhereInputSchema),z.lazy(() => PersonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastContacted: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  urls: z.lazy(() => UrlListRelationFilterSchema).optional(),
  notes: z.lazy(() => NoteListRelationFilterSchema).optional()
}).strict();

export const PersonOrderByWithRelationInputSchema: z.ZodType<Prisma.PersonOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastContacted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  urls: z.lazy(() => UrlOrderByRelationAggregateInputSchema).optional(),
  notes: z.lazy(() => NoteOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PersonWhereUniqueInputSchema: z.ZodType<Prisma.PersonWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PersonWhereInputSchema),z.lazy(() => PersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PersonWhereInputSchema),z.lazy(() => PersonWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastContacted: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  urls: z.lazy(() => UrlListRelationFilterSchema).optional(),
  notes: z.lazy(() => NoteListRelationFilterSchema).optional()
}).strict());

export const PersonOrderByWithAggregationInputSchema: z.ZodType<Prisma.PersonOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastContacted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PersonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PersonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PersonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PersonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PersonSumOrderByAggregateInputSchema).optional()
}).strict();

export const PersonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PersonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PersonScalarWhereWithAggregatesInputSchema),z.lazy(() => PersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PersonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PersonScalarWhereWithAggregatesInputSchema),z.lazy(() => PersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastContacted: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  birthday: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UrlWhereInputSchema: z.ZodType<Prisma.UrlWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UrlWhereInputSchema),z.lazy(() => UrlWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UrlWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UrlWhereInputSchema),z.lazy(() => UrlWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  personId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  person: z.union([ z.lazy(() => PersonRelationFilterSchema),z.lazy(() => PersonWhereInputSchema) ]).optional(),
}).strict();

export const UrlOrderByWithRelationInputSchema: z.ZodType<Prisma.UrlOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  person: z.lazy(() => PersonOrderByWithRelationInputSchema).optional()
}).strict();

export const UrlWhereUniqueInputSchema: z.ZodType<Prisma.UrlWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UrlWhereInputSchema),z.lazy(() => UrlWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UrlWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UrlWhereInputSchema),z.lazy(() => UrlWhereInputSchema).array() ]).optional(),
  personId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  person: z.union([ z.lazy(() => PersonRelationFilterSchema),z.lazy(() => PersonWhereInputSchema) ]).optional(),
}).strict());

export const UrlOrderByWithAggregationInputSchema: z.ZodType<Prisma.UrlOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UrlCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UrlAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UrlMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UrlMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UrlSumOrderByAggregateInputSchema).optional()
}).strict();

export const UrlScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UrlScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UrlScalarWhereWithAggregatesInputSchema),z.lazy(() => UrlScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UrlScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UrlScalarWhereWithAggregatesInputSchema),z.lazy(() => UrlScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  personId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NoteWhereInputSchema: z.ZodType<Prisma.NoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  personId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  note: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  person: z.union([ z.lazy(() => PersonRelationFilterSchema),z.lazy(() => PersonWhereInputSchema) ]).optional(),
}).strict();

export const NoteOrderByWithRelationInputSchema: z.ZodType<Prisma.NoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  person: z.lazy(() => PersonOrderByWithRelationInputSchema).optional()
}).strict();

export const NoteWhereUniqueInputSchema: z.ZodType<Prisma.NoteWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  personId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  note: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  person: z.union([ z.lazy(() => PersonRelationFilterSchema),z.lazy(() => PersonWhereInputSchema) ]).optional(),
}).strict());

export const NoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NoteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NoteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NoteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NoteSumOrderByAggregateInputSchema).optional()
}).strict();

export const NoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  personId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  note: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PersonCreateInputSchema: z.ZodType<Prisma.PersonCreateInput> = z.object({
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  lastContacted: z.coerce.date().optional().nullable(),
  birthday: z.coerce.date().optional().nullable(),
  urls: z.lazy(() => UrlCreateNestedManyWithoutPersonInputSchema).optional(),
  notes: z.lazy(() => NoteCreateNestedManyWithoutPersonInputSchema).optional()
}).strict();

export const PersonUncheckedCreateInputSchema: z.ZodType<Prisma.PersonUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  lastContacted: z.coerce.date().optional().nullable(),
  birthday: z.coerce.date().optional().nullable(),
  urls: z.lazy(() => UrlUncheckedCreateNestedManyWithoutPersonInputSchema).optional(),
  notes: z.lazy(() => NoteUncheckedCreateNestedManyWithoutPersonInputSchema).optional()
}).strict();

export const PersonUpdateInputSchema: z.ZodType<Prisma.PersonUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  urls: z.lazy(() => UrlUpdateManyWithoutPersonNestedInputSchema).optional(),
  notes: z.lazy(() => NoteUpdateManyWithoutPersonNestedInputSchema).optional()
}).strict();

export const PersonUncheckedUpdateInputSchema: z.ZodType<Prisma.PersonUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  urls: z.lazy(() => UrlUncheckedUpdateManyWithoutPersonNestedInputSchema).optional(),
  notes: z.lazy(() => NoteUncheckedUpdateManyWithoutPersonNestedInputSchema).optional()
}).strict();

export const PersonCreateManyInputSchema: z.ZodType<Prisma.PersonCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  lastContacted: z.coerce.date().optional().nullable(),
  birthday: z.coerce.date().optional().nullable()
}).strict();

export const PersonUpdateManyMutationInputSchema: z.ZodType<Prisma.PersonUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PersonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PersonUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UrlCreateInputSchema: z.ZodType<Prisma.UrlCreateInput> = z.object({
  url: z.string(),
  description: z.string().optional().nullable(),
  person: z.lazy(() => PersonCreateNestedOneWithoutUrlsInputSchema)
}).strict();

export const UrlUncheckedCreateInputSchema: z.ZodType<Prisma.UrlUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  personId: z.number().int(),
  url: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const UrlUpdateInputSchema: z.ZodType<Prisma.UrlUpdateInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  person: z.lazy(() => PersonUpdateOneRequiredWithoutUrlsNestedInputSchema).optional()
}).strict();

export const UrlUncheckedUpdateInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  personId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UrlCreateManyInputSchema: z.ZodType<Prisma.UrlCreateManyInput> = z.object({
  id: z.number().int().optional(),
  personId: z.number().int(),
  url: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const UrlUpdateManyMutationInputSchema: z.ZodType<Prisma.UrlUpdateManyMutationInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UrlUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  personId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NoteCreateInputSchema: z.ZodType<Prisma.NoteCreateInput> = z.object({
  note: z.string(),
  createdAt: z.coerce.date(),
  person: z.lazy(() => PersonCreateNestedOneWithoutNotesInputSchema)
}).strict();

export const NoteUncheckedCreateInputSchema: z.ZodType<Prisma.NoteUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  personId: z.number().int(),
  note: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const NoteUpdateInputSchema: z.ZodType<Prisma.NoteUpdateInput> = z.object({
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  person: z.lazy(() => PersonUpdateOneRequiredWithoutNotesNestedInputSchema).optional()
}).strict();

export const NoteUncheckedUpdateInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  personId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteCreateManyInputSchema: z.ZodType<Prisma.NoteCreateManyInput> = z.object({
  id: z.number().int().optional(),
  personId: z.number().int(),
  note: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const NoteUpdateManyMutationInputSchema: z.ZodType<Prisma.NoteUpdateManyMutationInput> = z.object({
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  personId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UrlListRelationFilterSchema: z.ZodType<Prisma.UrlListRelationFilter> = z.object({
  every: z.lazy(() => UrlWhereInputSchema).optional(),
  some: z.lazy(() => UrlWhereInputSchema).optional(),
  none: z.lazy(() => UrlWhereInputSchema).optional()
}).strict();

export const NoteListRelationFilterSchema: z.ZodType<Prisma.NoteListRelationFilter> = z.object({
  every: z.lazy(() => NoteWhereInputSchema).optional(),
  some: z.lazy(() => NoteWhereInputSchema).optional(),
  none: z.lazy(() => NoteWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UrlOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UrlOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonCountOrderByAggregateInputSchema: z.ZodType<Prisma.PersonCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  lastContacted: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PersonAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PersonMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  lastContacted: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonMinOrderByAggregateInputSchema: z.ZodType<Prisma.PersonMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  lastContacted: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonSumOrderByAggregateInputSchema: z.ZodType<Prisma.PersonSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const PersonRelationFilterSchema: z.ZodType<Prisma.PersonRelationFilter> = z.object({
  is: z.lazy(() => PersonWhereInputSchema).optional(),
  isNot: z.lazy(() => PersonWhereInputSchema).optional()
}).strict();

export const UrlCountOrderByAggregateInputSchema: z.ZodType<Prisma.UrlCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UrlAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UrlAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UrlMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UrlMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UrlMinOrderByAggregateInputSchema: z.ZodType<Prisma.UrlMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UrlSumOrderByAggregateInputSchema: z.ZodType<Prisma.UrlSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.NoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NoteAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.NoteSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UrlCreateNestedManyWithoutPersonInputSchema: z.ZodType<Prisma.UrlCreateNestedManyWithoutPersonInput> = z.object({
  create: z.union([ z.lazy(() => UrlCreateWithoutPersonInputSchema),z.lazy(() => UrlCreateWithoutPersonInputSchema).array(),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema),z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UrlCreateManyPersonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteCreateNestedManyWithoutPersonInputSchema: z.ZodType<Prisma.NoteCreateNestedManyWithoutPersonInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutPersonInputSchema),z.lazy(() => NoteCreateWithoutPersonInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema),z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NoteCreateManyPersonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UrlUncheckedCreateNestedManyWithoutPersonInputSchema: z.ZodType<Prisma.UrlUncheckedCreateNestedManyWithoutPersonInput> = z.object({
  create: z.union([ z.lazy(() => UrlCreateWithoutPersonInputSchema),z.lazy(() => UrlCreateWithoutPersonInputSchema).array(),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema),z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UrlCreateManyPersonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NoteUncheckedCreateNestedManyWithoutPersonInputSchema: z.ZodType<Prisma.NoteUncheckedCreateNestedManyWithoutPersonInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutPersonInputSchema),z.lazy(() => NoteCreateWithoutPersonInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema),z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NoteCreateManyPersonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UrlUpdateManyWithoutPersonNestedInputSchema: z.ZodType<Prisma.UrlUpdateManyWithoutPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => UrlCreateWithoutPersonInputSchema),z.lazy(() => UrlCreateWithoutPersonInputSchema).array(),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema),z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UrlUpsertWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => UrlUpsertWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UrlCreateManyPersonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UrlUpdateWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => UrlUpdateWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UrlUpdateManyWithWhereWithoutPersonInputSchema),z.lazy(() => UrlUpdateManyWithWhereWithoutPersonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UrlScalarWhereInputSchema),z.lazy(() => UrlScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteUpdateManyWithoutPersonNestedInputSchema: z.ZodType<Prisma.NoteUpdateManyWithoutPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutPersonInputSchema),z.lazy(() => NoteCreateWithoutPersonInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema),z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteUpsertWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => NoteUpsertWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NoteCreateManyPersonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteUpdateWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => NoteUpdateWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteUpdateManyWithWhereWithoutPersonInputSchema),z.lazy(() => NoteUpdateManyWithWhereWithoutPersonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UrlUncheckedUpdateManyWithoutPersonNestedInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateManyWithoutPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => UrlCreateWithoutPersonInputSchema),z.lazy(() => UrlCreateWithoutPersonInputSchema).array(),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema),z.lazy(() => UrlCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UrlUpsertWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => UrlUpsertWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UrlCreateManyPersonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UrlWhereUniqueInputSchema),z.lazy(() => UrlWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UrlUpdateWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => UrlUpdateWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UrlUpdateManyWithWhereWithoutPersonInputSchema),z.lazy(() => UrlUpdateManyWithWhereWithoutPersonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UrlScalarWhereInputSchema),z.lazy(() => UrlScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyWithoutPersonNestedInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyWithoutPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => NoteCreateWithoutPersonInputSchema),z.lazy(() => NoteCreateWithoutPersonInputSchema).array(),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema),z.lazy(() => NoteCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NoteUpsertWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => NoteUpsertWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NoteCreateManyPersonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NoteWhereUniqueInputSchema),z.lazy(() => NoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NoteUpdateWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => NoteUpdateWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NoteUpdateManyWithWhereWithoutPersonInputSchema),z.lazy(() => NoteUpdateManyWithWhereWithoutPersonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PersonCreateNestedOneWithoutUrlsInputSchema: z.ZodType<Prisma.PersonCreateNestedOneWithoutUrlsInput> = z.object({
  create: z.union([ z.lazy(() => PersonCreateWithoutUrlsInputSchema),z.lazy(() => PersonUncheckedCreateWithoutUrlsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonCreateOrConnectWithoutUrlsInputSchema).optional(),
  connect: z.lazy(() => PersonWhereUniqueInputSchema).optional()
}).strict();

export const PersonUpdateOneRequiredWithoutUrlsNestedInputSchema: z.ZodType<Prisma.PersonUpdateOneRequiredWithoutUrlsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PersonCreateWithoutUrlsInputSchema),z.lazy(() => PersonUncheckedCreateWithoutUrlsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonCreateOrConnectWithoutUrlsInputSchema).optional(),
  upsert: z.lazy(() => PersonUpsertWithoutUrlsInputSchema).optional(),
  connect: z.lazy(() => PersonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PersonUpdateToOneWithWhereWithoutUrlsInputSchema),z.lazy(() => PersonUpdateWithoutUrlsInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutUrlsInputSchema) ]).optional(),
}).strict();

export const PersonCreateNestedOneWithoutNotesInputSchema: z.ZodType<Prisma.PersonCreateNestedOneWithoutNotesInput> = z.object({
  create: z.union([ z.lazy(() => PersonCreateWithoutNotesInputSchema),z.lazy(() => PersonUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonCreateOrConnectWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => PersonWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PersonUpdateOneRequiredWithoutNotesNestedInputSchema: z.ZodType<Prisma.PersonUpdateOneRequiredWithoutNotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PersonCreateWithoutNotesInputSchema),z.lazy(() => PersonUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonCreateOrConnectWithoutNotesInputSchema).optional(),
  upsert: z.lazy(() => PersonUpsertWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => PersonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PersonUpdateToOneWithWhereWithoutNotesInputSchema),z.lazy(() => PersonUpdateWithoutNotesInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutNotesInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UrlCreateWithoutPersonInputSchema: z.ZodType<Prisma.UrlCreateWithoutPersonInput> = z.object({
  url: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const UrlUncheckedCreateWithoutPersonInputSchema: z.ZodType<Prisma.UrlUncheckedCreateWithoutPersonInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const UrlCreateOrConnectWithoutPersonInputSchema: z.ZodType<Prisma.UrlCreateOrConnectWithoutPersonInput> = z.object({
  where: z.lazy(() => UrlWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UrlCreateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema) ]),
}).strict();

export const UrlCreateManyPersonInputEnvelopeSchema: z.ZodType<Prisma.UrlCreateManyPersonInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UrlCreateManyPersonInputSchema),z.lazy(() => UrlCreateManyPersonInputSchema).array() ]),
}).strict();

export const NoteCreateWithoutPersonInputSchema: z.ZodType<Prisma.NoteCreateWithoutPersonInput> = z.object({
  note: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const NoteUncheckedCreateWithoutPersonInputSchema: z.ZodType<Prisma.NoteUncheckedCreateWithoutPersonInput> = z.object({
  id: z.number().int().optional(),
  note: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const NoteCreateOrConnectWithoutPersonInputSchema: z.ZodType<Prisma.NoteCreateOrConnectWithoutPersonInput> = z.object({
  where: z.lazy(() => NoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NoteCreateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema) ]),
}).strict();

export const NoteCreateManyPersonInputEnvelopeSchema: z.ZodType<Prisma.NoteCreateManyPersonInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NoteCreateManyPersonInputSchema),z.lazy(() => NoteCreateManyPersonInputSchema).array() ]),
}).strict();

export const UrlUpsertWithWhereUniqueWithoutPersonInputSchema: z.ZodType<Prisma.UrlUpsertWithWhereUniqueWithoutPersonInput> = z.object({
  where: z.lazy(() => UrlWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UrlUpdateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedUpdateWithoutPersonInputSchema) ]),
  create: z.union([ z.lazy(() => UrlCreateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedCreateWithoutPersonInputSchema) ]),
}).strict();

export const UrlUpdateWithWhereUniqueWithoutPersonInputSchema: z.ZodType<Prisma.UrlUpdateWithWhereUniqueWithoutPersonInput> = z.object({
  where: z.lazy(() => UrlWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UrlUpdateWithoutPersonInputSchema),z.lazy(() => UrlUncheckedUpdateWithoutPersonInputSchema) ]),
}).strict();

export const UrlUpdateManyWithWhereWithoutPersonInputSchema: z.ZodType<Prisma.UrlUpdateManyWithWhereWithoutPersonInput> = z.object({
  where: z.lazy(() => UrlScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UrlUpdateManyMutationInputSchema),z.lazy(() => UrlUncheckedUpdateManyWithoutPersonInputSchema) ]),
}).strict();

export const UrlScalarWhereInputSchema: z.ZodType<Prisma.UrlScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UrlScalarWhereInputSchema),z.lazy(() => UrlScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UrlScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UrlScalarWhereInputSchema),z.lazy(() => UrlScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  personId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NoteUpsertWithWhereUniqueWithoutPersonInputSchema: z.ZodType<Prisma.NoteUpsertWithWhereUniqueWithoutPersonInput> = z.object({
  where: z.lazy(() => NoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NoteUpdateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedUpdateWithoutPersonInputSchema) ]),
  create: z.union([ z.lazy(() => NoteCreateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedCreateWithoutPersonInputSchema) ]),
}).strict();

export const NoteUpdateWithWhereUniqueWithoutPersonInputSchema: z.ZodType<Prisma.NoteUpdateWithWhereUniqueWithoutPersonInput> = z.object({
  where: z.lazy(() => NoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NoteUpdateWithoutPersonInputSchema),z.lazy(() => NoteUncheckedUpdateWithoutPersonInputSchema) ]),
}).strict();

export const NoteUpdateManyWithWhereWithoutPersonInputSchema: z.ZodType<Prisma.NoteUpdateManyWithWhereWithoutPersonInput> = z.object({
  where: z.lazy(() => NoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NoteUpdateManyMutationInputSchema),z.lazy(() => NoteUncheckedUpdateManyWithoutPersonInputSchema) ]),
}).strict();

export const NoteScalarWhereInputSchema: z.ZodType<Prisma.NoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteScalarWhereInputSchema),z.lazy(() => NoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  personId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  note: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PersonCreateWithoutUrlsInputSchema: z.ZodType<Prisma.PersonCreateWithoutUrlsInput> = z.object({
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  lastContacted: z.coerce.date().optional().nullable(),
  birthday: z.coerce.date().optional().nullable(),
  notes: z.lazy(() => NoteCreateNestedManyWithoutPersonInputSchema).optional()
}).strict();

export const PersonUncheckedCreateWithoutUrlsInputSchema: z.ZodType<Prisma.PersonUncheckedCreateWithoutUrlsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  lastContacted: z.coerce.date().optional().nullable(),
  birthday: z.coerce.date().optional().nullable(),
  notes: z.lazy(() => NoteUncheckedCreateNestedManyWithoutPersonInputSchema).optional()
}).strict();

export const PersonCreateOrConnectWithoutUrlsInputSchema: z.ZodType<Prisma.PersonCreateOrConnectWithoutUrlsInput> = z.object({
  where: z.lazy(() => PersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PersonCreateWithoutUrlsInputSchema),z.lazy(() => PersonUncheckedCreateWithoutUrlsInputSchema) ]),
}).strict();

export const PersonUpsertWithoutUrlsInputSchema: z.ZodType<Prisma.PersonUpsertWithoutUrlsInput> = z.object({
  update: z.union([ z.lazy(() => PersonUpdateWithoutUrlsInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutUrlsInputSchema) ]),
  create: z.union([ z.lazy(() => PersonCreateWithoutUrlsInputSchema),z.lazy(() => PersonUncheckedCreateWithoutUrlsInputSchema) ]),
  where: z.lazy(() => PersonWhereInputSchema).optional()
}).strict();

export const PersonUpdateToOneWithWhereWithoutUrlsInputSchema: z.ZodType<Prisma.PersonUpdateToOneWithWhereWithoutUrlsInput> = z.object({
  where: z.lazy(() => PersonWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PersonUpdateWithoutUrlsInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutUrlsInputSchema) ]),
}).strict();

export const PersonUpdateWithoutUrlsInputSchema: z.ZodType<Prisma.PersonUpdateWithoutUrlsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.lazy(() => NoteUpdateManyWithoutPersonNestedInputSchema).optional()
}).strict();

export const PersonUncheckedUpdateWithoutUrlsInputSchema: z.ZodType<Prisma.PersonUncheckedUpdateWithoutUrlsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.lazy(() => NoteUncheckedUpdateManyWithoutPersonNestedInputSchema).optional()
}).strict();

export const PersonCreateWithoutNotesInputSchema: z.ZodType<Prisma.PersonCreateWithoutNotesInput> = z.object({
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  lastContacted: z.coerce.date().optional().nullable(),
  birthday: z.coerce.date().optional().nullable(),
  urls: z.lazy(() => UrlCreateNestedManyWithoutPersonInputSchema).optional()
}).strict();

export const PersonUncheckedCreateWithoutNotesInputSchema: z.ZodType<Prisma.PersonUncheckedCreateWithoutNotesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  lastContacted: z.coerce.date().optional().nullable(),
  birthday: z.coerce.date().optional().nullable(),
  urls: z.lazy(() => UrlUncheckedCreateNestedManyWithoutPersonInputSchema).optional()
}).strict();

export const PersonCreateOrConnectWithoutNotesInputSchema: z.ZodType<Prisma.PersonCreateOrConnectWithoutNotesInput> = z.object({
  where: z.lazy(() => PersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PersonCreateWithoutNotesInputSchema),z.lazy(() => PersonUncheckedCreateWithoutNotesInputSchema) ]),
}).strict();

export const PersonUpsertWithoutNotesInputSchema: z.ZodType<Prisma.PersonUpsertWithoutNotesInput> = z.object({
  update: z.union([ z.lazy(() => PersonUpdateWithoutNotesInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutNotesInputSchema) ]),
  create: z.union([ z.lazy(() => PersonCreateWithoutNotesInputSchema),z.lazy(() => PersonUncheckedCreateWithoutNotesInputSchema) ]),
  where: z.lazy(() => PersonWhereInputSchema).optional()
}).strict();

export const PersonUpdateToOneWithWhereWithoutNotesInputSchema: z.ZodType<Prisma.PersonUpdateToOneWithWhereWithoutNotesInput> = z.object({
  where: z.lazy(() => PersonWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PersonUpdateWithoutNotesInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutNotesInputSchema) ]),
}).strict();

export const PersonUpdateWithoutNotesInputSchema: z.ZodType<Prisma.PersonUpdateWithoutNotesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  urls: z.lazy(() => UrlUpdateManyWithoutPersonNestedInputSchema).optional()
}).strict();

export const PersonUncheckedUpdateWithoutNotesInputSchema: z.ZodType<Prisma.PersonUncheckedUpdateWithoutNotesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastContacted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  urls: z.lazy(() => UrlUncheckedUpdateManyWithoutPersonNestedInputSchema).optional()
}).strict();

export const UrlCreateManyPersonInputSchema: z.ZodType<Prisma.UrlCreateManyPersonInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const NoteCreateManyPersonInputSchema: z.ZodType<Prisma.NoteCreateManyPersonInput> = z.object({
  id: z.number().int().optional(),
  note: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const UrlUpdateWithoutPersonInputSchema: z.ZodType<Prisma.UrlUpdateWithoutPersonInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UrlUncheckedUpdateWithoutPersonInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateWithoutPersonInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UrlUncheckedUpdateManyWithoutPersonInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateManyWithoutPersonInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NoteUpdateWithoutPersonInputSchema: z.ZodType<Prisma.NoteUpdateWithoutPersonInput> = z.object({
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateWithoutPersonInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateWithoutPersonInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NoteUncheckedUpdateManyWithoutPersonInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyWithoutPersonInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PersonFindFirstArgsSchema: z.ZodType<Prisma.PersonFindFirstArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereInputSchema.optional(),
  orderBy: z.union([ PersonOrderByWithRelationInputSchema.array(),PersonOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PersonScalarFieldEnumSchema,PersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PersonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PersonFindFirstOrThrowArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereInputSchema.optional(),
  orderBy: z.union([ PersonOrderByWithRelationInputSchema.array(),PersonOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PersonScalarFieldEnumSchema,PersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PersonFindManyArgsSchema: z.ZodType<Prisma.PersonFindManyArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereInputSchema.optional(),
  orderBy: z.union([ PersonOrderByWithRelationInputSchema.array(),PersonOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PersonScalarFieldEnumSchema,PersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PersonAggregateArgsSchema: z.ZodType<Prisma.PersonAggregateArgs> = z.object({
  where: PersonWhereInputSchema.optional(),
  orderBy: z.union([ PersonOrderByWithRelationInputSchema.array(),PersonOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PersonGroupByArgsSchema: z.ZodType<Prisma.PersonGroupByArgs> = z.object({
  where: PersonWhereInputSchema.optional(),
  orderBy: z.union([ PersonOrderByWithAggregationInputSchema.array(),PersonOrderByWithAggregationInputSchema ]).optional(),
  by: PersonScalarFieldEnumSchema.array(),
  having: PersonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PersonFindUniqueArgsSchema: z.ZodType<Prisma.PersonFindUniqueArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereUniqueInputSchema,
}).strict() ;

export const PersonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PersonFindUniqueOrThrowArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereUniqueInputSchema,
}).strict() ;

export const UrlFindFirstArgsSchema: z.ZodType<Prisma.UrlFindFirstArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  where: UrlWhereInputSchema.optional(),
  orderBy: z.union([ UrlOrderByWithRelationInputSchema.array(),UrlOrderByWithRelationInputSchema ]).optional(),
  cursor: UrlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UrlScalarFieldEnumSchema,UrlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UrlFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UrlFindFirstOrThrowArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  where: UrlWhereInputSchema.optional(),
  orderBy: z.union([ UrlOrderByWithRelationInputSchema.array(),UrlOrderByWithRelationInputSchema ]).optional(),
  cursor: UrlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UrlScalarFieldEnumSchema,UrlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UrlFindManyArgsSchema: z.ZodType<Prisma.UrlFindManyArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  where: UrlWhereInputSchema.optional(),
  orderBy: z.union([ UrlOrderByWithRelationInputSchema.array(),UrlOrderByWithRelationInputSchema ]).optional(),
  cursor: UrlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UrlScalarFieldEnumSchema,UrlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UrlAggregateArgsSchema: z.ZodType<Prisma.UrlAggregateArgs> = z.object({
  where: UrlWhereInputSchema.optional(),
  orderBy: z.union([ UrlOrderByWithRelationInputSchema.array(),UrlOrderByWithRelationInputSchema ]).optional(),
  cursor: UrlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UrlGroupByArgsSchema: z.ZodType<Prisma.UrlGroupByArgs> = z.object({
  where: UrlWhereInputSchema.optional(),
  orderBy: z.union([ UrlOrderByWithAggregationInputSchema.array(),UrlOrderByWithAggregationInputSchema ]).optional(),
  by: UrlScalarFieldEnumSchema.array(),
  having: UrlScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UrlFindUniqueArgsSchema: z.ZodType<Prisma.UrlFindUniqueArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  where: UrlWhereUniqueInputSchema,
}).strict() ;

export const UrlFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UrlFindUniqueOrThrowArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  where: UrlWhereUniqueInputSchema,
}).strict() ;

export const NoteFindFirstArgsSchema: z.ZodType<Prisma.NoteFindFirstArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoteScalarFieldEnumSchema,NoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NoteFindFirstOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoteScalarFieldEnumSchema,NoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NoteFindManyArgsSchema: z.ZodType<Prisma.NoteFindManyArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoteScalarFieldEnumSchema,NoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NoteAggregateArgsSchema: z.ZodType<Prisma.NoteAggregateArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NoteGroupByArgsSchema: z.ZodType<Prisma.NoteGroupByArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithAggregationInputSchema.array(),NoteOrderByWithAggregationInputSchema ]).optional(),
  by: NoteScalarFieldEnumSchema.array(),
  having: NoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NoteFindUniqueArgsSchema: z.ZodType<Prisma.NoteFindUniqueArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() ;

export const NoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NoteFindUniqueOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() ;

export const PersonCreateArgsSchema: z.ZodType<Prisma.PersonCreateArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  data: z.union([ PersonCreateInputSchema,PersonUncheckedCreateInputSchema ]),
}).strict() ;

export const PersonUpsertArgsSchema: z.ZodType<Prisma.PersonUpsertArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereUniqueInputSchema,
  create: z.union([ PersonCreateInputSchema,PersonUncheckedCreateInputSchema ]),
  update: z.union([ PersonUpdateInputSchema,PersonUncheckedUpdateInputSchema ]),
}).strict() ;

export const PersonCreateManyArgsSchema: z.ZodType<Prisma.PersonCreateManyArgs> = z.object({
  data: z.union([ PersonCreateManyInputSchema,PersonCreateManyInputSchema.array() ]),
}).strict() ;

export const PersonDeleteArgsSchema: z.ZodType<Prisma.PersonDeleteArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereUniqueInputSchema,
}).strict() ;

export const PersonUpdateArgsSchema: z.ZodType<Prisma.PersonUpdateArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  data: z.union([ PersonUpdateInputSchema,PersonUncheckedUpdateInputSchema ]),
  where: PersonWhereUniqueInputSchema,
}).strict() ;

export const PersonUpdateManyArgsSchema: z.ZodType<Prisma.PersonUpdateManyArgs> = z.object({
  data: z.union([ PersonUpdateManyMutationInputSchema,PersonUncheckedUpdateManyInputSchema ]),
  where: PersonWhereInputSchema.optional(),
}).strict() ;

export const PersonDeleteManyArgsSchema: z.ZodType<Prisma.PersonDeleteManyArgs> = z.object({
  where: PersonWhereInputSchema.optional(),
}).strict() ;

export const UrlCreateArgsSchema: z.ZodType<Prisma.UrlCreateArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  data: z.union([ UrlCreateInputSchema,UrlUncheckedCreateInputSchema ]),
}).strict() ;

export const UrlUpsertArgsSchema: z.ZodType<Prisma.UrlUpsertArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  where: UrlWhereUniqueInputSchema,
  create: z.union([ UrlCreateInputSchema,UrlUncheckedCreateInputSchema ]),
  update: z.union([ UrlUpdateInputSchema,UrlUncheckedUpdateInputSchema ]),
}).strict() ;

export const UrlCreateManyArgsSchema: z.ZodType<Prisma.UrlCreateManyArgs> = z.object({
  data: z.union([ UrlCreateManyInputSchema,UrlCreateManyInputSchema.array() ]),
}).strict() ;

export const UrlDeleteArgsSchema: z.ZodType<Prisma.UrlDeleteArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  where: UrlWhereUniqueInputSchema,
}).strict() ;

export const UrlUpdateArgsSchema: z.ZodType<Prisma.UrlUpdateArgs> = z.object({
  select: UrlSelectSchema.optional(),
  include: UrlIncludeSchema.optional(),
  data: z.union([ UrlUpdateInputSchema,UrlUncheckedUpdateInputSchema ]),
  where: UrlWhereUniqueInputSchema,
}).strict() ;

export const UrlUpdateManyArgsSchema: z.ZodType<Prisma.UrlUpdateManyArgs> = z.object({
  data: z.union([ UrlUpdateManyMutationInputSchema,UrlUncheckedUpdateManyInputSchema ]),
  where: UrlWhereInputSchema.optional(),
}).strict() ;

export const UrlDeleteManyArgsSchema: z.ZodType<Prisma.UrlDeleteManyArgs> = z.object({
  where: UrlWhereInputSchema.optional(),
}).strict() ;

export const NoteCreateArgsSchema: z.ZodType<Prisma.NoteCreateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  data: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
}).strict() ;

export const NoteUpsertArgsSchema: z.ZodType<Prisma.NoteUpsertArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
  create: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
  update: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
}).strict() ;

export const NoteCreateManyArgsSchema: z.ZodType<Prisma.NoteCreateManyArgs> = z.object({
  data: z.union([ NoteCreateManyInputSchema,NoteCreateManyInputSchema.array() ]),
}).strict() ;

export const NoteDeleteArgsSchema: z.ZodType<Prisma.NoteDeleteArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() ;

export const NoteUpdateArgsSchema: z.ZodType<Prisma.NoteUpdateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  include: NoteIncludeSchema.optional(),
  data: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
  where: NoteWhereUniqueInputSchema,
}).strict() ;

export const NoteUpdateManyArgsSchema: z.ZodType<Prisma.NoteUpdateManyArgs> = z.object({
  data: z.union([ NoteUpdateManyMutationInputSchema,NoteUncheckedUpdateManyInputSchema ]),
  where: NoteWhereInputSchema.optional(),
}).strict() ;

export const NoteDeleteManyArgsSchema: z.ZodType<Prisma.NoteDeleteManyArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
}).strict() ;