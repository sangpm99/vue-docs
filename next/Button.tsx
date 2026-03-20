<Button fullWidth variant='contained' type='submit' disabled={isPending} className='flex gap-2'>
    {isPending && <CircularProgress size={20} color='inherit' />}
    Log In
</Button>