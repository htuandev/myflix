import _ from 'lodash';
import { PipelineStage } from 'mongoose';
import { CategoryType } from '@/types';

const categories = (path: CategoryType): PipelineStage[] => [
  {
    $unwind: {
      path: `$${path}`
    }
  },
  {
    $group: {
      _id: `$${path}`,
      credits: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      credits: -1
    }
  },
  {
    $lookup: {
      from: `${_.capitalize(path)}`,
      localField: '_id',
      foreignField: '_id',
      as: 'data'
    }
  },
  {
    $unwind: {
      path: '$data'
    }
  },
  {
    $project: {
      name: '$data.name',
      slug: '$data.slug'
    }
  }
];

const years = (): PipelineStage[] => [
  {
    $group: {
      _id: '$year'
    }
  },
  {
    $project: {
      name: {
        $toString: '$_id'
      }
    }
  },
  {
    $match: {
      _id: {
        $ne: 0
      }
    }
  },
  {
    $sort: {
      _id: -1
    }
  },
  {
    $limit: 24
  }
];

const pipelines = { categories, years };
export default pipelines;
