export const addressSelect = {
  addressId: true,
  name: true,
  address1: true,
  address2: true,
  city: true,
  region: true,
  phone: true,
  phoneType: true,
};

export const companySelect = {
  companyId: true,
  name: true,
  description: true,
  address: {
    select: addressSelect,
  },
};

export const projectSelectApi = {
  projectId: true,
  name: true,
  description: true,
  company: {
    select: companySelect,
  },
};

export const applicationSelectApi = {
  applicationId: true,
  name: true,
  description: true,
  project: {
    select: projectSelectApi,
  },
};
