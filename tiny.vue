<label>Description <span class="text-error">*</span></label>
<TinyTextEditor
  v-model="woocommerceTemplate.properties.description"
></TinyTextEditor>

import { requiredValidator } from "@/@core/utils/validators";
:rules="[requiredValidator]"